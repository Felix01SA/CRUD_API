import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { UserRouter } from './routes/UserRoutes'
import { InsRoutes } from './routes/InsRoutes'
import { OutsRoutes } from './routes/OutsRoutes'

const app = express()

app.use(bodyParser.json())

app.use(UserRouter, InsRoutes, OutsRoutes)

app.get(`/`, (req: Request, res: Response) => {
  res.json({ message: `Hello World` })
})

const port = process.env.PORT || 3333

app.listen(port, () => console.log(`Servidor Rodando na porta ${port}`))
