import express from 'express';

//daos
import { postCommentDao, userDao } from '../databaseStorage/daos';

export const postCommentRouter = express.Router();
import { PostCommentController } from '../controllers/postComment';
const postCommentController = new PostCommentController(postCommentDao, userDao);


postCommentRouter.get('/', postCommentController.getUsersPostComments);
postCommentRouter.post('/', postCommentController.addPostComment);
postCommentRouter.delete('/:id', postCommentController.removePostComment);
postCommentRouter.put('/:id', postCommentController.editPostComment);
