"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessagesController {
    constructor(messagesDao) {
        this.addMessages = async (_req, _res) => {
            try {
                console.log(this.messagesDao);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.getMessages = async (_req, _res) => {
            try {
                console.log(this.messagesDao);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.messagesDao = messagesDao;
    }
}
exports.MessagesController = MessagesController;
//# sourceMappingURL=messages.js.map