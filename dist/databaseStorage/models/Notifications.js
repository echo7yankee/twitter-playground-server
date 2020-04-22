"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Post_1 = require("./Post");
const Schema = mongoose_1.default.Schema;
const notificationsSchema = new Schema(Post_1.postSchema);
exports.Notification = mongoose_1.default.model('notification', notificationsSchema);
//# sourceMappingURL=Notifications.js.map