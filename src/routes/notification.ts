import express from 'express';
//daos
import { postDao } from '../databaseStorage/daos';

export const notificationRouter = express.Router();
import { NotificationController } from '../controllers/notification';
const notificationController = new NotificationController(postDao);

notificationRouter.get('/', notificationController.getNotifications);
