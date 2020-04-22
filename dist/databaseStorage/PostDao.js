"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dao_1 = require("./Dao");
class PostDao extends Dao_1.DAO {
    async updateAll(filter, params) {
        try {
            const items = await this.client.model.updateMany(filter, { $set: params }, { multi: true });
            return items;
        }
        catch (error) {
            console.log(error);
        }
    }
    async findAndUpdate(postId, updatedItem) {
        try {
            const updatedItems = await this.client.model.findOneAndUpdate({ _id: postId }, { postComments: updatedItem }, { upsert: true });
            return await updatedItems;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.PostDao = PostDao;
//# sourceMappingURL=PostDao.js.map