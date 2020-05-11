import express from 'express';
//daos
import { messagesDao } from '../databaseStorage/daos';

export const messagesRouter = express.Router();
import { MessagesController } from '../controllers/messages';
const messagesController = new MessagesController(messagesDao);

messagesRouter.post('/', messagesController.addMessages);
messagesRouter.get('/:roomId', messagesController.getMessages);
