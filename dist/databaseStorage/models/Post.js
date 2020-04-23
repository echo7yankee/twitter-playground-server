"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./User");
const Schema = mongoose_1.default.Schema;
exports.postSchema = new Schema({
    username: { type: String, required: true },
    profileImg: { type: String, },
    createdAt: { type: Date, default: Date.now },
    comment: { type: String, required: true },
    postComments: { type: Array, },
    poll: {
        whoVoted: { type: Array },
        pollLengthDays: { type: Number },
        pollLengthHours: { type: Number },
        pollLengthMinutes: { type: Number },
        choices: { type: Array },
    },
    whoLiked: {
        type: Array,
    },
    likes: { type: Number },
    userId: { type: String, required: true },
    uuid: { type: String },
    user: User_1.userSchema,
    isNotification: { type: Boolean },
});
exports.Post = mongoose_1.default.model('post', exports.postSchema);
//# sourceMappingURL=Post.js.map