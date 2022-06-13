"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutsRoutes = void 0;
const express_1 = require("express");
const OutsController_1 = __importDefault(require("../controllers/OutsController"));
const router = (0, express_1.Router)();
exports.OutsRoutes = router;
router.post('/outs/create', OutsController_1.default.create);
router.get('/outs', OutsController_1.default.index);
router.get('/outs/find', OutsController_1.default.show);
router.put('/outs/update', OutsController_1.default.update);
router.delete('/outs/delete', OutsController_1.default.delete);
