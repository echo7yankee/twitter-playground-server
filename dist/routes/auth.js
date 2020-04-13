"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const daos_1 = require("../databaseStorage/daos");
exports.authRouter = express_1.default.Router();
const auth_1 = require("../controllers/auth");
const authController = new auth_1.AuthController(daos_1.userDao);
exports.authRouter.post('/register', authController.createUser);
exports.authRouter.post('/login', authController.loginUser);
//# sourceMappingURL=auth.js.map