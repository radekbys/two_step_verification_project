import express from 'express'
import { Request, Response } from 'express'
import { findUser, updateUser } from '../mockDatabase/MockDatabaseOperations'
import { User } from '../User/User'
import { randomInt } from 'crypto'
import MailSender from '../MailSender/MailSender'

const router = express.Router()

router.route('/firstStep').post(async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    res.status(403).send({ message: 'Incorrect email or password' })
    return
  }

  let user: User
  try {
    user = await findUser(req.body.email)
  } catch (e) {
    console.error(e.message)
    res.status(404).send({ message: 'No user with this email address' })
    return
  }

  if (!user.isSamePassword(req.body.password)) {
    res.status(403).send({ message: 'Incorrect email or password' })
    return
  }

  const verificationCode: string = String(randomInt(1000, 10000))

  try {
    await user.addVerCodeHash(verificationCode)
    await updateUser(user)
  } catch (e) {
    console.error(e.message)
    res.status(500).send({ message: "Could't assign verification code" })
    return
  }

  try {
    const sender = new MailSender()
    await sender.sendMail(user.email, verificationCode)
  } catch (e) {
    console.error(e.message)
    res.status(500).send({
      message: "Verification code couldn't be send"
    })
    return
  }

  res.status(200).send({
    message: 'User OK'
  })
  return
})

router.route('/secondStep').post(async (req: Request, res: Response) => {
  req.body.email
  req.body.password
  req.body.code

  let user: User
  try {
    user = await findUser(req.body.email)
  } catch (e) {
    console.error(e.message)
    res.status(404).send({ message: 'No user with this email address' })
    return
  }

  try {
    if (!(await user.isSamePassword(req.body.password))) {
      throw new Error('wrong password')
    }
    if (!(await user.checkVerCode(req.body.code))) {
      throw new Error('wrong verification Code')
    }
  } catch (e) {
    console.error(e.message)
    res.status(403).send({ message: 'Authorization failed' })
    return
  }
  res.status(200).send({
    message: 'you have logged in',
    JWT: 'Json Web Token will be there in full implementation'
  })
  return
})

export default router
