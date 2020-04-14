//import path from 'path';

//ts types
import { UserDao } from "../databaseStorage/UserDao";
import { Request, Response } from 'express';
import { PostDao } from "../databaseStorage/PostDao";
import { PostCommentDao } from "../databaseStorage/PostCommentsDao";

//Utils
import { getFollowingUser } from "../utils/getFollowingUser";
import { getFollowerUser } from "../utils/getFollowerUser";
import { filterFollowingUser } from "../utils/filterFollowingUser";
import { filterFollowerUser } from "../utils/filterFollowerUser";

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
        social: {
          ...user.social,
          followingCount: user.social.following.length,
          followersCount: user.social.followers.length,
        }
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

  public followUser = async (req: Request, res: Response) => {
    try {

      const { ownerId, visitorId }: { ownerId: string, visitorId: string } = req.query;

      const user = await this.userDao.findById(ownerId);
      const visitorUser = await this.userDao.findById(visitorId);
      let newUser;
      let newVisitorUser

      if (!user || !visitorUser) {
        return res.status(400).json({ error: 'User not found' })
      }

      const sameFollowingUser = getFollowingUser(visitorId, user)
      const sameFollowerUser = getFollowerUser(ownerId, visitorUser)

      if (sameFollowingUser || sameFollowerUser) {
        newUser = filterFollowingUser(visitorId, user);
        newVisitorUser = filterFollowerUser(ownerId, visitorUser);

        await this.userDao.update(ownerId, newUser);
        await this.userDao.update(visitorId, newVisitorUser);

        return res.status(200).json({ message: 'Success' })
      }

      newUser = {
        ...user,
        social: {
          ...user.social,
          following: [...user.social.following, visitorId],
        },
      }

      newVisitorUser = {
        ...visitorUser,
        social: {
          ...visitorUser.social,
          followers: [...visitorUser.social.followers, ownerId],
        }
      }

      await this.userDao.update(ownerId, newUser);
      await this.userDao.update(visitorId, newVisitorUser);

      return res.status(200).json({ message: 'Success' })

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
