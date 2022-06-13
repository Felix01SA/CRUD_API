"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsRoutes = void 0;
const express_1 = require("express");
const InsController_1 = __importDefault(require("../controllers/InsController"));
const router = (0, express_1.Router)();
exports.InsRoutes = router;
router.post('/ins/create', InsController_1.default.create);
router.get('/ins', InsController_1.default.index);
router.get('/ins/find', InsController_1.default.show);
router.put('/ins/update', InsController_1.default.update);
router.delete('/ins/delete', InsController_1.default.delete);
