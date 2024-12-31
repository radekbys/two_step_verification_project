import express from 'express'
import { Request, Response } from 'express'
import loginRouter from './routes/login'

const app = express()

app.use(express.json())

app.use('/login', loginRouter)

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    hello: 'hello, backend working'
  })
})

app.listen(4000, () => {
  console.log('listening on port 4000')
})
