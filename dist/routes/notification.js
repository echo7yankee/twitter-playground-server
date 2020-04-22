"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const daos_1 = require("../databaseStorage/daos");
exports.notificationRouter = express_1.default.Router();
const notification_1 = require("../controllers/notification");
const notificationController = new notification_1.NotificationController(daos_1.postDao);
exports.notificationRouter.get('/', notificationController.getNotifications);
//# sourceMappingURL=notification.js.map