import { readFile, writeFile } from 'fs/promises'
import User from '../User/User'

interface DbObject {
  users: User[]
}

export async function addUser (user: User) {
  let db: DbObject
  try {
    db = JSON.parse(await readFile('./src/mockDatabase/mockDB.json', 'utf-8'))
  } catch (e) {
    if (e.code === 'ENOENT') {
      db = {
        users: []
      }
    } else {
      console.log('Cannot open db file')
      return
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

  if (
    db.users.filter((user2: User) => {
      user2.email === user.email
    }).length !== 0
  ) {
    console.log('User with this email already exists')
    return
  }

  db.users.push(user)

  try {
    await writeFile(
      './src/mockDatabase/mockDB.json',
      JSON.stringify(db, null, 2),
      'utf-8'
    )
  } catch (e) {
    console.log('Cannot write to the db file')
    return
  }
}
