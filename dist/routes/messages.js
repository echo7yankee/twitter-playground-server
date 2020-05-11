"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const daos_1 = require("../databaseStorage/daos");
exports.messagesRouter = express_1.default.Router();
const messages_1 = require("../controllers/messages");
const messagesController = new messages_1.MessagesController(daos_1.messagesDao);
exports.messagesRouter.post('/', messagesController.addMessages);
exports.messagesRouter.get('/:roomId', messagesController.getMessages);
//# sourceMappingURL=messages.js.map