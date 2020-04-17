import express from 'express';

//daos
import { postDao, postCommentDao, userDao } from '../databaseStorage/daos';

export const postRouter = express.Router();
import { PostController } from '../controllers/post';
const postController = new PostController(postDao, postCommentDao, userDao);

postRouter.post('/', postController.addPost);
postRouter.get('/', postController.getPosts);
postRouter.get('/all', postController.getAllPosts);
postRouter.get('/:postId', postController.getPost);
postRouter.delete('/:id', postController.removePost);
postRouter.put('/:id', postController.editPost);
postRouter.put('/:id/like', postController.likePost);
postRouter.put('/:id/poll-vote', postController.votePoll)
