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
        username: `${user.fName} ${user.lName}`,
        createdAt: user.createdAt,
        profileImg: user.profileImg,
        location: user.location,
        bio: user.bio,
        website: user.website,
        age: user.age,
        social: user.social,
      }

      return res.status(200).json(userDetails);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public getUsers = async (req: Request, res: Response) => {
    try {
      const params = req.query;
      if (params.username) {
        params.username = new RegExp(params.username);
        params.username = { $regex: params.username, $options: 'i' };
      }

      const users = await this.userDao.find(params);

      if (!users) {
        return res.status(400).json({});
      }

      const processedUsers = users.map((user) => {
        const newUsers = {
          ...user.toJSON(),
          id: user._id,
        }
        delete newUsers._id;
        delete newUsers.password;
        delete newUsers.confirmPassword;
        return newUsers;
      })

      if (!processedUsers.length) {
        return res.status(400).json({ error: 'Sorry! User has not been found' });
      }

      return res.status(200).json(processedUsers);

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

      await this.postDao.updateAll({ userId: newUser.id }, { user: newUser });
      updatedUser = await this.userDao.update(id, newUser);
      return res.status(200).json(updatedUser);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public turnUserAcceptanceOnTrue = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { room, updatedUserAdmin } = req.body;
      let user = await this.userDao.findById(id);
      if (!user) { return res.status(400).json({ message: 'User not found' }); }

      user = {
        ...user.toJSON(),
        social: {
          ...user.social,
          usersToMessage: user.social.usersToMessage.map((userVisitor) => {
            if (userVisitor.id === updatedUserAdmin.id) {
              return {
                ...userVisitor,
                social: {
                  ...userVisitor.social,
                  roomIds: updatedUserAdmin.social.roomIds.map((roomId) => {
                    if (roomId.id === room.id) {
                      return {
                        ...roomId,
                        hasAccepted: true,
                      }
                    }
                    return roomId;
                  })
                }
              }
            }
            return userVisitor;
          }),
          roomIds: user.social.roomIds.map((roomId) => {
            if (roomId.id === room.id) {
              return {
                ...roomId,
                hasAccepted: true,
              }
            }
            return roomId;
          })
        }
      };
      await this.userDao.update(id, user);
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public cancelUserAcceptance = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { userVisitorId, roomId } = req.query;
      let user = await this.userDao.findById(id);
      user = {
        ...user.toJSON(),
        social: {
          ...user.social,
          usersToMessage: user.social.usersToMessage.filter((user) => user.id !== userVisitorId),
          roomIds: user.social.roomIds.filter((room) => room.id !== roomId),
        }
      }
      if (!user) { return res.status(400).json({ error: 'User not found' }) }
      await this.userDao.update(id, user);
      return res.status({ message: 'Success' });
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
      let newVisitorUser;

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
        await this.postDao.updateAll({ userId: visitorId }, { user: newVisitorUser });

        return res.status(200).json({ message: 'Success' })
      }

      newUser = {
        ...user.toJSON(),
        social: {
          ...user.social,
          followingCount: user.social.following.length + 1,
          following: [...user.social.following, visitorId],
        },
      }

      newVisitorUser = {
        ...visitorUser.toJSON(),
        social: {
          ...visitorUser.social,
          followersCount: visitorUser.social.followers.length + 1,
          followers: [...visitorUser.social.followers, ownerId],
        }
      }

      await this.userDao.update(ownerId, newUser);
      await this.userDao.update(visitorId, newVisitorUser);
      await this.postDao.updateAll({ userId: visitorId }, { user: newVisitorUser });

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

        await this.postDao.updateAll({ userId: id }, { profileImg: newUser.profileImg });
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
