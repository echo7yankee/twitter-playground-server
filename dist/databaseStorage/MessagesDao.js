"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dao_1 = require("./Dao");
class MessagesDao extends Dao_1.DAO {
    async findAndUpdate(filter, params) {
        try {
            const updatedItems = await this.client.model.findOneAndUpdate(filter, params, { upsert: true });
            return await updatedItems;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.MessagesDao = MessagesDao;
//# sourceMappingURL=MessagesDao.js.map