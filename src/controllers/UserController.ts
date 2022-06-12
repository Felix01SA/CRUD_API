import { Request, Response, RouterOptions } from 'express'
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'

const database = new PrismaClient()

class UserController {
  async create(req: Request, res: Response) {
    const { name, login, password } = req.body

    const existUser = await database.user.findUnique({ where: { login } })

    if (existUser) return res.status(400).json({ error: 'User already exists' })

    try {
      const id = uuid()

      const newUser = await database.user.create({
        data: {
          name,
          login,
          password,
          id,
        },
      })

      newUser.password = `` // remove a senha do retorno

      return res.json({ user: newUser }) // retorna o usuário criado
    } catch (e) {
      return res.status(400).json({ error: e })
    }
  }

  async find(req: Request, res: Response) {
    const { login, password } = req.body

    const existUser = await database.user.findUnique({
      where: { login },
      include: { ins: true, outs: true },
    })

    if (!existUser) return res.status(400).json({ error: 'User not found' })

    if (existUser.password !== password)
      return res.status(400).json({ error: 'Password invalid' })

    existUser.password = `` // remove a senha do retorno

    return res.json({ user: existUser }) // retorna o usuário existente
  }

  async update(req: Request, res: Response) {
    const id = req.params.id
    const { name, password } = req.body

    const existUser = await database.user.findUnique({ where: { id } })

    if (!existUser) return res.status(400).json({ error: 'User not found' })

    let data

    if (!name) {
      data = {
        password,
      }
    } else if (!password) {
      data = {
        name,
      }
    } else {
      data = {
        name,
        password,
      }
    }

    const userUpdated = await database.user.update({
      where: { id },
      data: {
        ...data,
      },
    })

    userUpdated.password = `` // remove a senha do retorno

    return res.json({ user: userUpdated })
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id

    const existUser = await database.user.findUnique({ where: { id } })

    if (!existUser) return res.status(400).json({ error: 'User not found' })

    await database.user.delete({ where: { id } })

    return res.json({ message: 'User deleted' })
  }
}

export default new UserController()
