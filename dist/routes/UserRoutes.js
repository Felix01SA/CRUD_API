"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = (0, express_1.Router)();
exports.UserRouter = router;
router.post(`/user/register`, UserController_1.default.create);
router.post(`/user/login`, UserController_1.default.find);
router.put(`/user/update/:id`, UserController_1.default.update);
router.delete(`/user/delete/:id`, UserController_1.default.delete);
