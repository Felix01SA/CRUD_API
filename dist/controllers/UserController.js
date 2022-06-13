"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database = new client_1.PrismaClient();
class UserController {
    async create(req, res) {
        const { name, login, password } = req.body;
        const existUser = await database.user.findUnique({ where: { login } });
        if (existUser)
            return res.status(400).json({ error: 'User already exists' });
        try {
            const id = (0, uuid_1.v4)();
            const encryptedPassword = bcryptjs_1.default.hashSync(password, 10);
            const newUser = await database.user.create({
                data: {
                    name,
                    login,
                    password: encryptedPassword,
                    id,
                },
            });
            return res.json({ user: omitPassword(newUser) }); // retorna o usuário criado
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ error: e });
        }
    }
    async find(req, res) {
        const { login, password } = req.body;
        const existUser = await database.user.findUnique({
            where: { login },
            include: { ins: true, outs: true },
        });
        if (!existUser)
            return res.status(400).json({ error: 'User not found' });
        if (!(await bcryptjs_1.default.compare(password, existUser.password)))
            return res.status(400).json({ error: 'Password invalid' });
        return res.json({ user: omitPassword(existUser) });
    }
    async update(req, res) {
        const id = req.params.id;
        const { name, password } = req.body;
        const existUser = await database.user.findUnique({ where: { id } });
        if (!existUser)
            return res.status(400).json({ error: 'User not found' });
        const encryptedPassword = bcryptjs_1.default.hashSync(password, 10);
        let data;
        if (!name) {
            data = {
                password: encryptedPassword,
            };
        }
        else if (!password) {
            data = {
                name,
            };
        }
        else {
            data = {
                name,
                password: encryptedPassword,
            };
        }
        const userUpdated = await database.user.update({
            where: { id },
            data: {
                ...data,
            },
        });
        return res.json({ user: omitPassword(userUpdated) });
    }
    async delete(req, res) {
        const id = req.params.id;
        const existUser = await database.user.findUnique({ where: { id } });
        if (!existUser)
            return res.status(400).json({ error: 'User not found' });
        await database.user.delete({ where: { id } });
        return res.json({ message: 'User deleted' });
    }
}
exports.default = new UserController();
/**
 * * Oculta a senha do usuário na resposta
 */
function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
