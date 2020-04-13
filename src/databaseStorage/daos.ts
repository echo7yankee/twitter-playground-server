import { MongoClient } from '../databaseStorage/clients/MongoClient';

//models
import { User } from './models/User';
import { Post } from './models/Post';
import { PostComment } from './models/PostComment';

//daos
import { UserDao } from './UserDao';
import { PostDao } from './PostDao';
import { PostCommentDao } from './PostCommentsDao';

//clients
const userClient: MongoClient = new MongoClient(User);
const postClient: MongoClient = new MongoClient(Post);
const postCommentClient: MongoClient = new MongoClient(PostComment);


export const userDao: UserDao = new UserDao(userClient);
export const postDao: PostDao = new PostDao(postClient);
export const postCommentDao: PostCommentDao = new PostCommentDao(postCommentClient);
