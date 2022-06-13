import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'

const database = new PrismaClient()

class UserController {
  async create(req: Request, res: Response) {
    const { name, login, password } = req.body

    const existUser = await database.user.findUnique({ where: { login } })

    if (existUser) return res.status(400).json({ error: 'User already exists' })

    try {
      const id = uuid()

      const encryptedPassword = bcrypt.hashSync(password, 10)

      const newUser = await database.user.create({
        data: {
          name,
          login,
          password: encryptedPassword,
          id,
        },
      })

      return res.json({ user: omitPassword(newUser) }) // retorna o usuário criado
    } catch (e) {
      console.log(e)

      return res.status(500).json({ error: e })
    }
  }

  async find(req: Request, res: Response) {
    const { login, password } = req.body

    const existUser = await database.user.findUnique({
      where: { login },
      include: { ins: true, outs: true },
    })

    if (!existUser) return res.status(400).json({ error: 'User not found' })

    if (!(await bcrypt.compare(password, existUser.password)))
      return res.status(400).json({ error: 'Password invalid' })

    return res.json({ user: omitPassword(existUser) })
  }

  async update(req: Request, res: Response) {
    const id = req.params.id
    const { name, password } = req.body

    const existUser = await database.user.findUnique({ where: { id } })

    if (!existUser) return res.status(400).json({ error: 'User not found' })

    const encryptedPassword = bcrypt.hashSync(password, 10)

    let data

    if (!name) {
      data = {
        password: encryptedPassword,
      }
    } else if (!password) {
      data = {
        name,
      }
    } else {
      data = {
        name,
        password: encryptedPassword,
      }
    }

    const userUpdated = await database.user.update({
      where: { id },
      data: {
        ...data,
      },
    })

    return res.json({ user: omitPassword(userUpdated) })
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

/**
 * * Oculta a senha do usuário na resposta
 */
function omitPassword(user: any) {
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}
