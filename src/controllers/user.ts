//import path from 'path';

//ts types
import { UserDao } from "../databaseStorage/UserDao";
import { Request, Response } from 'express';
import { PostDao } from "../databaseStorage/PostDao";
import { PostCommentDao } from "../databaseStorage/PostCommentsDao";

export class UserController {
  private userDao: UserDao
  private postDao: PostDao
  private postCommentDao: PostCommentDao
  constructor(userDao: UserDao, postDao: PostDao, postCommentDao: PostCommentDao) {
    this.userDao = userDao;
    this.postDao = postDao;
    this.postCommentDao = postCommentDao;
  }

  public getUserDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.userDao.findById(id);

      if (!user && !id) {
        return res.status(400).json({});
      }

      const userDetails = {
        id: user._id,
        fName: user.fName,
        lName: user.lName,
        createdAt: user.createdAt,
        profileImg: user.profileImg,
        location: user.location,
        bio: user.bio,
        website: user.website,
        age: user.age,
        privacy: user.privacy
      }

      return res.status(200).json(userDetails);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public editUserDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      let newUser;
      let updatedUser;

      newUser = {
        ...req.body
      }

      updatedUser = await this.userDao.update(id, newUser);
      return res.status(200).json(updatedUser);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public uploadUserImage = async (req: Request, res: Response) => {
    try {

      const { id } = req.params;
      let newUser;
      let updatedUser;

      if (req.files === null) {
        return res.status(400).json({ error: 'No image uploaded' })
      }

      const file = req.files.file;

      file.mv(`${process.cwd()}/src/public/${file.name}`, async err => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }

        newUser = {
          ...req.body,
          profileImg: file.name
        }

        await this.postDao.updateAll(id, newUser.profileImg);
        await this.postCommentDao.updateAll(id, newUser.profileImg);

        updatedUser = await this.userDao.update(id, newUser);
        return res.status(200).json(updatedUser);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

}
