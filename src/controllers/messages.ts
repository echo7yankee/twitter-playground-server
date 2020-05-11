import { MessagesDao } from "../databaseStorage/MessagesDao";
import { Request, Response } from 'express';

export class MessagesController {
  private messagesDao: MessagesDao
  constructor(messagesDao: MessagesDao) {
    this.messagesDao = messagesDao;
  }

  public addMessages = async (req: Request, res: Response) => {
    try {
      const filter = req.query;

      if (!filter.roomId) {
        return res.status(400).json({});
      }
      const messages = await this.messagesDao.findOne({ roomId: filter.roomId })

      if (messages === null) {
        await this.messagesDao.add({ roomId: filter.roomId, messages: req.body });
        return res.status(200).json({ message: "Message does not exist. First messages has been added" });
      }
      const params = {
        roomId: filter.roomId,
        messages: [...messages.messages, req.body],
      }
      await this.messagesDao.update(messages.id, params);
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public getMessages = async (req: Request, res: Response) => {
    try {
      const { roomId } = req.params;
      const messages = await this.messagesDao.findOne({ roomId });
      if (messages === null) {
        return res.status(200).json({ roomId: '', messages: [] });
      }

      return res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
