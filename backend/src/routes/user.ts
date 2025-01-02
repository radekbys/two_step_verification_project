import express from 'express'
import { Request, Response } from 'express'
import { addUser } from '../mockDatabase/MockDatabaseOperations'
import { User } from '../User/User'

const router = express.Router()

router.route('/').post(async (req: Request, res: Response) => {
  try {
    const user = await User.fromEmailPassword(req.body.email, req.body.password)
    await addUser(user)
    res.status(200).send({
      message: 'User created and added to database'
    })
  } catch (e) {
    res.status(400).send({
      message: 'adding user failes',
      Emessage: e.message
    })
  }
})

export default router
