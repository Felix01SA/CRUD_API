"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const client_1 = require("@prisma/client");
const database = new client_1.PrismaClient();
class OutsController {
    async create(req, res) {
        const { userId, value } = req.body;
        const existUser = await database.user.findUnique({
            where: { id: userId },
        });
        if (!existUser)
            return res.status(400).json({ error: 'ID de usuário invalido' });
        if (!value)
            return res.status(400).send({ error: 'Valor não especificado' });
        try {
            const id = (0, uuid_1.v4)();
            const newOut = await database.out.create({
                data: {
                    value,
                    id,
                    author: { connect: { id: userId } },
                },
            });
            return res.status(200).send({ message: 'Inserido com sucesso', newOut });
        }
        catch (e) {
            console.log(e);
            return res.status(500).send({ error: 'Erro interno no servidor' });
        }
    }
    async index(req, res) {
        const { userId } = req.body;
        const existUser = await database.user.findUnique({ where: { id: userId } });
        if (!existUser)
            return res.status(400).json({ error: 'ID de usuário invalido' });
        const outs = await database.out.findMany({
            where: { authorId: userId },
        });
        return res.status(200).send({ outs });
    }
    async show(req, res) {
        const { id } = req.body;
        const existOut = await database.out.findUnique({ where: { id } });
        if (!existOut)
            return res.status(400).json({ error: 'Outserção não encontrada' });
        return res.status(200).send({ in: existOut });
    }
    async update(req, res) {
        const { id, value } = req.body;
        const existOut = await database.out.findUnique({ where: { id } });
        if (!existOut)
            return res.status(400).json({ error: 'Saida não encontrada' });
        try {
            const updatedOut = await database.out.update({
                where: { id },
                data: { value },
            });
            return res
                .status(200)
                .send({ message: 'Atualizado com sucesso', updatedOut });
        }
        catch (e) {
            console.log(e);
            return res.status(500).send({ error: 'Erro interno no servidor' });
        }
    }
    async delete(req, res) {
        const { id } = req.body;
        const existOut = await database.out.findUnique({ where: { id } });
        if (!existOut)
            return res.status(400).json({ error: 'Saida não encontrada' });
        await database.out.delete({ where: { id } });
        return res.status(200).send({ message: 'Saida deletada' });
    }
}
exports.default = new OutsController();
