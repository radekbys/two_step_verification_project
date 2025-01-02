import bcrypt from 'bcrypt'

export interface RawUser {
  email: string
  passwordHash: string
  verCodeHash?: string
}

export class User implements RawUser {
  email: string
  passwordHash: string
  verCodeHash?: string

  private constructor () {}

  static async fromEmailPassword (
    email: string,
    password: string
  ): Promise<User> {
    try {
      const user = new User()
      user.email = email
      const salt = await bcrypt.genSalt(10)
      user.passwordHash = await bcrypt.hash(password, salt)
      return user
    } catch (e) {
      throw new Error("couldn't create a new user")
    }
  }

  static fromRawUser (rawUser: RawUser): User {
    const user = new User()
    user.email = rawUser.email
    user.passwordHash = rawUser.passwordHash
    if (rawUser.verCodeHash) user.verCodeHash = rawUser.verCodeHash
    return user
  }

  async isSamePassword (password: string): Promise<boolean> {
    try {
      const answer = await bcrypt.compare(password, this.passwordHash)
      if (answer) return true
      return false
    } catch (e) {
      throw new Error("couldn't compare passwords")
    }
  }

  async addVerCodeHash (verCode: string) {
    try {
      const salt = await bcrypt.genSalt(10)
      this.verCodeHash = await bcrypt.hash(verCode, salt)
    } catch (e) {
      throw new Error("couldn't save verification code")
    }
  }

  async checkVerCode (verCode: string): Promise<boolean> {
    if (!this.verCodeHash) {
      throw new Error('no verification code in the data')
    }
    try {
      const answer = await bcrypt.compare(verCode, this.verCodeHash)
      if (answer) return true
      return false
    } catch (e) {
      throw new Error("couldn't compare verification codes")
    }
  }
}
