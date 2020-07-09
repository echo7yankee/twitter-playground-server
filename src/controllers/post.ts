//ts types
import { PostDao } from "../databaseStorage/PostDao";
import { Request, Response } from 'express';
import { PostCommentDao } from "../databaseStorage/PostCommentsDao";
import { UserDao } from "../databaseStorage/UserDao";

//TODO: GetAllPosts and GetPosts should be only one function with different params. Work on this
//TODO: Fix email removal when accepting to message user. The bug happens when adding a user to Message

export class PostController {
  private postDao: PostDao
  private postCommentDao: PostCommentDao
  private userDao: UserDao
  constructor(postDao: PostDao, postCommentDao: PostCommentDao, userDao: UserDao) {
    this.postDao = postDao;
    this.postCommentDao = postCommentDao;
    this.userDao = userDao;
  }

  public addPost = async (req: Request, res: Response) => {
    try {

      const { userId, username, profileImg }
        : { userId: string, username: string, profileImg: string } = req.query;

      const user = await this.userDao.findById(userId);

      if (!userId) {
        return res.status(400).json({ error: 'Something went wrong' })
      }

      const newPost = {
        ...req.body,
        likes: 0,
        userId,
        username,
        profileImg,
        user,
      }

      const post = await this.postDao.add(newPost);
      const processedPost = {
        ...post.toJSON(),
        id: post._id,
      }
      delete processedPost._id;

      return res.status(200).json(processedPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public getPosts = async (req: Request, res: Response) => {
    try {
      const { userId }: { userId: string } = req.query;
      const posts = await this.postDao.find({ userId });
      if (!posts) {
        return res.status(400).json({ error: 'Posts not found' });
      }

      const processedPosts = posts.map(post => {
        const newPost = {
          ...post.toJSON(),
          user: post.user.map((user) => {
            const newUser = {
              ...user,
              id: user._id,
            }

            delete newUser._id;
            delete newUser.password,
              delete newUser.confirmPassword;

            return newUser;
          }),
          id: post._id,
        }
        delete newPost._id;
        return newPost;
      })

      return res.status(200).json(processedPosts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public getAllPosts = async (req: Request, res: Response) => {
    try {
      const params = req.query;

      const posts = await this.postDao.find(params);
      const postComments = await this.postCommentDao.find({})

      if (!postComments) {
        return res.status(400).json({ error: 'Post Comment do not exist or user does not exist' });
      }

      if (!posts) {
        return res.status(400).json({ error: 'Posts not found' });
      }

      const processedPostComments = postComments.map((postComment) => {
        const newPostComment = {
          ...postComment.toJSON(),
          id: postComment._id,
        }
        delete newPostComment._id;
        return newPostComment;
      }).sort((a, b) => {
        return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
      })

      const processedPosts = posts.map((post) => {
        const newUser = {
          ...post.user.toJSON(),
          id: post.user._id,
        }
        delete newUser._id;
        delete newUser.password,
          delete newUser.confirmPassword;

        const newPost = {
          ...post.toJSON(),
          user: newUser,
          id: post._id,
          postComments: processedPostComments.filter((postComment) => {
            return post._id.equals(postComment.postId);
          })
        }
        delete newPost._id;
        return newPost;
      })

      processedPosts.sort((a: any, b: any): any => {
        return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
      })

      return res.status(200).json(processedPosts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public getPost = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const post = await this.postDao.findById(postId);
      const postComments = await this.postCommentDao.find({ postId: post._id })
      if (!post) {
        return res.status(400).json({ error: 'Post does not exist' })
      }
      const processedPostComments = postComments.map((comment) => {
        let newComments = {
          ...comment.toJSON(),
          id: comment._id
        }
        delete newComments._id
        return newComments;
      })
      const processedPost = {
        ...post.toJSON(),
        postComments: processedPostComments,
        id: post._id,
      }

      delete processedPost._id;

      return res.status(200).json(processedPost);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public removePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const removedPost = await this.postDao.remove(id);

      if (!removedPost) {
        return res.status(400).json({});
      }

      return res.status(200).json({ message: 'success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public editPost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedPost = {
        ...req.body
      }
      const editedPost = await this.postDao.update(id, updatedPost);

      if (!editedPost) {
        return res.status(400).json({});
      }

      return res.status(200).json({ message: 'success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public likePost = async (req: Request, res: Response) => {
    try {

      let likedPost;
      let editedPost;
      let newPost;

      const { id }: { id: string } = req.params;
      const { userId }: { userId: string } = req.query;

      const post = await this.postDao.findById(id);

      const isSameUser = post.whoLiked.some(item => {
        return item === userId
      });

      if (isSameUser) {
        newPost = {
          ...post.toJSON(),
          whoLiked: post.whoLiked.filter(item => {
            return item !== userId;
          })
        }

        editedPost = {
          ...newPost,
          likes: newPost.whoLiked.length
        }

        likedPost = await this.postDao.update(post._id, editedPost);
        return res.status(200).json(likedPost);
      }

      newPost = {
        ...post.toJSON(),
        whoLiked: [...post.whoLiked, userId]
      }

      editedPost = {
        ...newPost,
        likes: newPost.whoLiked.length
      }

      likedPost = await this.postDao.update(post._id, editedPost);
      return res.status(200).json(likedPost);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public votePoll = async (req: Request, res: Response) => {
    try {
      const { id }: { id: string } = req.params;
      const post = await this.postDao.findById(id);

      let editedPost;
      let newPost;

      const isSameUser = post.poll.whoVoted.some(item => {
        return item.userId === req.body.userId
      });

      if (isSameUser) {
        newPost = {
          ...post.toJSON(),
          poll: {
            ...post.poll,
            whoVoted: post.poll.whoVoted.filter(item => {
              return item.userId !== req.body.userId;
            })
          }
        }

        await this.postDao.update(post._id, newPost);
        return res.status(200).json({ message: 'Success' });
      }

      editedPost = {
        ...post.toJSON(),
        poll: {
          ...post.poll,
          whoVoted: [...post.poll.whoVoted, { ...req.body }]
        }
      }

      await this.postDao.update(post._id, editedPost);
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

}
