"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserRoutes_1 = require("./routes/UserRoutes");
const InsRoutes_1 = require("./routes/InsRoutes");
const OutsRoutes_1 = require("./routes/OutsRoutes");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(UserRoutes_1.UserRouter, InsRoutes_1.InsRoutes, OutsRoutes_1.OutsRoutes);
app.get(`/`, (req, res) => {
    res.json({ message: `Hello World` });
});
const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Servidor Rodando na porta ${port}`));
