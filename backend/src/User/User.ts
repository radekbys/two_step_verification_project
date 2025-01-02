import bcrypt from 'bcrypt'

export interface RawUser {
  email: string
  hash: string
  salt: string
}

export class User implements RawUser {
  email: string
  hash: string
  salt: string

  private constructor () {}

  static async fromEmailPassword (
    email: string,
    password: string
  ): Promise<User> {
    try {
      const user = new User()
      user.email = email
      user.salt = await bcrypt.genSalt(10)
      user.hash = await bcrypt.hash(password, user.salt)
      return user
    } catch (e) {
      throw new Error('couldnt create a new user')
    }
  }

  static fromRawUser (rawUser: RawUser): User {
    const user = new User()
    user.email = rawUser.email
    user.hash = rawUser.hash
    user.salt = rawUser.salt
    return user
  }

  async isSamePassword (password: string): Promise<boolean> {
    try {
      const answer = await bcrypt.compare(password, this.hash)
      if (answer) return true
      return false
    } catch (e) {
      throw new Error("couldn't compare passwords")
    }
  }
}
