import { PostCommentDao } from "../databaseStorage/PostCommentsDao";
import { Request, Response } from 'express';
import { UserDao } from "../databaseStorage/UserDao";

export class PostCommentController {
  private postCommentDao: PostCommentDao
  private userDao: UserDao
  constructor(postCommentDao: PostCommentDao, userDao: UserDao) {
    this.postCommentDao = postCommentDao;
    this.userDao = userDao;
  }

  public getUsersPostComments = async (_req: Request, res: Response) => {
    try {
      const postsComment = await this.postCommentDao.find({});
      if (!postsComment) {
        return res.status(400).json({ error: 'Posts not found' });
      }

      const processedPostComments = postsComment.map(post => {
        const newPostComment = {
          ...post.toJSON(),
          id: post._id
        }
        delete newPostComment._id;
        return newPostComment;
      })

      return res.status(200).json(processedPostComments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }


  public addPostComment = async (req: Request, res: Response) => {
    try {

      const { userId } = req.query;
      const { postId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: "Something went wrong" })
      }

      const user = await this.userDao.findById(userId);

      const newPostComment = {
        ...req.body,
        userId,
        postId,
        username: `${user.fName} ${user.lName}`,
        profileImg: user.profileImg,
        createdAt: new Date(),
      }

      const postComment = await this.postCommentDao.add(newPostComment);
      return res.status(200).json(postComment);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public removePostComment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const post = await this.postCommentDao.findOne({ uuid: id });
      const removedPostComment = await this.postCommentDao.remove(post._id);

      if (!removedPostComment) {
        return res.status(400).json({});
      }

      return res.status(200).json({ message: 'success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public editPostComment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const comment = await this.postCommentDao.findOne({ uuid: id })

      if (!comment) {
        return res.status(400).json({});
      }

      const updatedPostComment = {
        ...req.body,
        createdAt: new Date(),
      }

      await this.postCommentDao.update(comment._id, updatedPostComment);

      return res.status(200).json({ message: 'success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }


}
