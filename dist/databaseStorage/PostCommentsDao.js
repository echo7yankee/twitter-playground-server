"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dao_1 = require("./Dao");
class PostCommentDao extends Dao_1.DAO {
    async updateAll(userId, profileImg) {
        try {
            const items = await this.client.model.updateMany({ userId }, { $set: { profileImg } }, { multi: true });
            return items;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.PostCommentDao = PostCommentDao;
//# sourceMappingURL=PostCommentsDao.js.map