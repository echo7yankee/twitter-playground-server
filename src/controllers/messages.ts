import { MessagesDao } from "../databaseStorage/MessagesDao";
import { Request, Response } from 'express';

export class MessagesController {
  private messagesDao: MessagesDao
  constructor(messagesDao: MessagesDao) {
    this.messagesDao = messagesDao;
  }

  public addMessages = async (_req: Request, _res: Response) => {
    try {
      console.log(this.messagesDao);
    } catch (error) {
      console.log(error);
    }
  }

  public getMessages = async (_req: Request, _res: Response) => {
    try {
      console.log(this.messagesDao);
    } catch (error) {
      console.log(error);
    }
  }
}
