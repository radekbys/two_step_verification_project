import express from 'express'
import { Request, Response } from 'express'

const router = express.Router()

router.route('/firstStep').post((req: Request, res: Response) => {
  if (
    req.body.email === 'rebusik67@gmail.com' &&
    req.body.password === '1234'
  ) {
    res.status(200)
    res.send({
      message: 'data correct, verification email has been sent'
    })
    return
  }
  res.status(403).send({ message: 'Incorrect email or password' })
})

router.route('/secondStep').post((req: Request, res: Response) => {
  if (
    req.body.email === 'rebusik67@gmail.com' &&
    req.body.password === '1234' &&
    req.body.code === '1234'
  ) {
    res.status(200)
    res.send({
      message: 'you have logged in'
    })
    return
  }
  res.status(403).send({ message: 'Incorrect verification code' })
})

export default router
