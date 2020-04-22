"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotificationController {
    constructor(postDao) {
        this.getNotifications = async (req, res) => {
            try {
                const params = req.query;
                const notifications = await this.postDao.find(params);
                const processedNotifications = {
                    notifications,
                    notificationsLength: notifications.length
                };
                return res.status(200).json(processedNotifications);
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