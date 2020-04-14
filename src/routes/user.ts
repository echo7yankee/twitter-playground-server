import express from 'express';

//daos
import { userDao } from '../databaseStorage/daos';
import { postDao } from '../databaseStorage/daos';
import { postCommentDao } from '../databaseStorage/daos';

export const userRouter = express.Router();
import { UserController } from '../controllers/user';
const userController = new UserController(userDao, postDao, postCommentDao);

userRouter.get('/userDetails/:id', userController.getUserDetails);
userRouter.put('/userDetails/:id', userController.editUserDetails);
userRouter.put('/userDetails/:id/upload', userController.uploadUserImage);
userRouter.post('/userDetails/follow', userController.followUser);
