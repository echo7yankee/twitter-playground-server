"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const daos_1 = require("../databaseStorage/daos");
exports.postCommentRouter = express_1.default.Router();
const postComment_1 = require("../controllers/postComment");
const postCommentController = new postComment_1.PostCommentController(daos_1.postCommentDao, daos_1.userDao);
exports.postCommentRouter.get('/', postCommentController.getUsersPostComments);
exports.postCommentRouter.post('/', postCommentController.addPostComment);
exports.postCommentRouter.delete('/:id', postCommentController.removePostComment);
exports.postCommentRouter.put('/:id', postCommentController.editPostComment);
//# sourceMappingURL=postComment.js.map