"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotificationController {
    constructor(postDao) {
        this.getNotifications = async (req, res) => {
            try {
                const params = req.query;
                const notifications = await this.postDao.find(params);
                const filteredNotifications = notifications.filter((notification) => notification.isNotification === true);
                const processedNotifications = {
                    notifications: filteredNotifications,
                    notificationsLength: filteredNotifications.length,
                };
                return res.status(200).json(processedNotifications);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.updateAllNotifications = async (req, res) => {
            try {
                const { notificationState } = req.body;
                const params = req.query;
                await this.postDao.updateAll(params, { isNotification: notificationState });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.postDao = postDao;
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.js.map