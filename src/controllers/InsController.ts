import { v4 as uuid } from 'uuid'
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const database = new PrismaClient()

class InsController {
  async create(req: Request, res: Response) {
    const { userId, value } = req.body

    const existUser = await database.user.findUnique({
      where: { id: userId },
    })

    if (!existUser)
      return res.status(400).json({ error: 'ID de usuário invalido' })

    if (!value) return res.status(400).send({ error: 'Valor não especificado' })

    try {
      const id = uuid()

      const newIn = await database.ins.create({
        data: {
          value,
          id,
          author: { connect: { id: userId } },
        },
      })

      return res.status(200).send({ message: 'Inserido com sucesso', newIn })
    } catch (e) {
      console.log(e)
      return res.status(500).send({ error: 'Erro interno no servidor' })
    }
  }

  async index(req: Request, res: Response) {
    const { userId } = req.body

    const existUser = await database.user.findUnique({ where: { id: userId } })

    if (!existUser)
      return res.status(400).json({ error: 'ID de usuário invalido' })

    const ins = await database.ins.findMany({
      where: { authorId: userId },
    })

    return res.status(200).send({ ins })
  }

  async show(req: Request, res: Response) {
    const { id } = req.body

    const existIn = await database.ins.findUnique({ where: { id } })

    if (!existIn)
      return res.status(400).json({ error: 'Inserção não encontrada' })

    return res.status(200).send({ in: existIn })
  }

  async update(req: Request, res: Response) {
    const { id, value } = req.body

    const existIn = await database.ins.findUnique({ where: { id } })

    if (!existIn)
      return res.status(400).json({ error: 'Inserção não encontrada' })

    try {
      const updatedIn = await database.ins.update({
        where: { id },
        data: { value },
      })

      return res
        .status(200)
        .send({ message: 'Atualizado com sucesso', updatedIn })
    } catch (e) {
      console.log(e)
      return res.status(500).send({ error: 'Erro interno no servidor' })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body

    const existIn = await database.ins.findUnique({ where: { id } })

    if (!existIn)
      return res.status(400).json({ error: 'Inserção não encontrada' })

    await database.ins.delete({ where: { id } })

    return res.status(200).send({ message: 'Inserção deletada' })
  }
}

export default new InsController()
