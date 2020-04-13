"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DAO {
    constructor(client) {
        this.client = client;
    }
    async find(params) {
        return await this.client.find(params);
    }
    async findById(id) {
        return await this.client.findById(id);
    }
    async findOne(params) {
        return await this.client.findOne(params);
    }
    async add(item) {
        return await this.client.create(item);
    }
    async remove(id) {
        return await this.client.remove(id);
    }
    async removeAll(params) {
        return await this.client.removeAll(params);
    }
    async update(id, item) {
        return await this.client.update(id, item);
    }
}
exports.DAO = DAO;
;
//# sourceMappingURL=Dao.js.map