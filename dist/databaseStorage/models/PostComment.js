"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PostCommentSchema = new Schema({
    userId: {
        type: String,
    },
    postId: {
        type: String,
    },
    postComment: {
        type: String
    },
    username: {
        type: String
    },
    profileImg: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.PostComment = mongoose_1.default.model('postcomment', PostCommentSchema);
//# sourceMappingURL=PostComment.js.map