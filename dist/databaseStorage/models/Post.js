"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const postSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        required: true
    },
    postComments: {
        type: Array,
    },
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
    likes: {
        type: Number
    },
    userId: {
        type: String,
        required: true
    },
    userProfileImg: {
        type: String,
    }
});
exports.Post = mongoose_1.default.model('post', postSchema);
//# sourceMappingURL=Post.js.map