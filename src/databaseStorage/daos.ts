import { MongoClient } from '../databaseStorage/clients/MongoClient';

//models
import { User } from './models/User';
import { Post } from './models/Post';
import { PostComment } from './models/PostComment';
import { Notification } from './models/Notifications';

//daos
import { UserDao } from './UserDao';
import { PostDao } from './PostDao';
import { PostCommentDao } from './PostCommentsDao';
import { NotificationDao } from './NotificationDao';

//clients
const userClient: MongoClient = new MongoClient(User);
const postClient: MongoClient = new MongoClient(Post);
const postCommentClient: MongoClient = new MongoClient(PostComment);
const notificationClient: MongoClient = new MongoClient(Notification)


export const userDao: UserDao = new UserDao(userClient);
export const postDao: PostDao = new PostDao(postClient);
export const postCommentDao: PostCommentDao = new PostCommentDao(postCommentClient);
export const notificationDao: NotificationDao = new NotificationDao(notificationClient);
