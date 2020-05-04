"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const daos_1 = require("../databaseStorage/daos");
const daos_2 = require("../databaseStorage/daos");
const daos_3 = require("../databaseStorage/daos");
exports.userRouter = express_1.default.Router();
const user_1 = require("../controllers/user");
const userController = new user_1.UserController(daos_1.userDao, daos_2.postDao, daos_3.postCommentDao);
exports.userRouter.get('/search', userController.getUsersInSearch);
exports.userRouter.get('/userDetails/:id', userController.getUserDetails);
exports.userRouter.put('/userDetails/:id', userController.editUserDetails);
exports.userRouter.put('/userDetails/:id/upload', userController.uploadUserImage);
exports.userRouter.post('/userDetails/follow', userController.followUser);
//# sourceMappingURL=user.js.map