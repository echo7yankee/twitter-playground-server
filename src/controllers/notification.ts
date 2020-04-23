import { PostDao } from "../databaseStorage/PostDao";
import { Request, Response } from 'express';

export class NotificationController {
  private postDao: PostDao
  constructor(postDao: PostDao) {
    this.postDao = postDao;
  }

  public getNotifications = async (req: Request, res: Response) => {
    try {
      const params = req.query;
      const notifications = await this.postDao.find(params);
      const filteredNotifications = notifications.filter((notification) => notification.isNotification === true);
      const processedNotifications = {
        notifications: filteredNotifications,
        notificationsLength: filteredNotifications.length,
      }
      return res.status(200).json(processedNotifications);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public updateAllNotifications = async (req: Request, res: Response) => {
    try {
      const { notificationState } = req.body;
      const params = req.query;

      await this.postDao.updateAll(params, { isNotification: notificationState });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
