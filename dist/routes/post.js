"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const daos_1 = require("../databaseStorage/daos");
exports.postRouter = express_1.default.Router();
const post_1 = require("../controllers/post");
const postController = new post_1.PostController(daos_1.postDao, daos_1.postCommentDao, daos_1.userDao);
exports.postRouter.post('/', postController.addPost);
exports.postRouter.get('/', postController.getPosts);
exports.postRouter.get('/all', postController.getAllPosts);
exports.postRouter.delete('/:id', postController.removePost);
exports.postRouter.put('/:id', postController.editPost);
exports.postRouter.put('/:id/like', postController.likePost);
exports.postRouter.put('/:id/poll-vote', postController.votePoll);
//# sourceMappingURL=post.js.map