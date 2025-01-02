import { readFile, writeFile } from 'fs/promises'
import { User, RawUser } from '../User/User'

interface DbObject {
  users: RawUser[]
}

async function readDatabase (): Promise<DbObject> {
  let db: DbObject
  try {
    db = JSON.parse(await readFile('./src/mockDatabase/mockDB.json', 'utf-8'))
  } catch (e) {
    if (e.code === 'ENOENT') {
      db = {
        users: []
      }
    } else {
      throw new Error('Cannot open db file')
    }
  }

  if (typeof db !== 'object' || db === null || Array.isArray(db)) {
    db = {
      users: []
    }
  }
  if (!Array.isArray(db.users)) {
    db = {
      users: []
    }
  }
  return db
}

async function saveDatabase (db: DbObject) {
  try {
    await writeFile(
      './src/mockDatabase/mockDB.json',
      JSON.stringify(db, null, 2),
      'utf-8'
    )
  } catch (e) {
    throw new Error('Cannot write to the db file')
  }
}

export async function addUser (user: RawUser) {
  try {
    const db: DbObject = await readDatabase()

    const existingUser = db.users.find(
      (user2: RawUser) => user2.email === user.email
    )
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    db.users.push(user)

    await saveDatabase(db)
  } catch (e) {
    console.error('Error:', e.message)
    throw e
  }
}

export async function findUser (email: string): Promise<User> {
  let db: DbObject
  try {
    db = await readDatabase()
  } catch (e) {
    console.error('Error:', e.message)
    throw e
  }
  const userArray: RawUser[] = db.users.filter(item => {
    return item.email === email
  })

  if (userArray.length === 0) {
    throw new Error('no user with this email address')
  }

  return User.fromRawUser(userArray[0])
}
