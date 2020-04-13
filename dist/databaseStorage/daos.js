"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient_1 = require("../databaseStorage/clients/MongoClient");
const User_1 = require("./models/User");
const Post_1 = require("./models/Post");
const PostComment_1 = require("./models/PostComment");
const UserDao_1 = require("./UserDao");
const PostDao_1 = require("./PostDao");
const PostCommentsDao_1 = require("./PostCommentsDao");
const userClient = new MongoClient_1.MongoClient(User_1.User);
const postClient = new MongoClient_1.MongoClient(Post_1.Post);
const postCommentClient = new MongoClient_1.MongoClient(PostComment_1.PostComment);
exports.userDao = new UserDao_1.UserDao(userClient);
exports.postDao = new PostDao_1.PostDao(postClient);
exports.postCommentDao = new PostCommentsDao_1.PostCommentDao(postCommentClient);
//# sourceMappingURL=daos.js.map