
import { DAO } from './Dao';

export class MessagesDao extends DAO {
  public async findAndUpdate(filter, params) {
    try {
      const updatedItems = await this.client.model.findOneAndUpdate(
        filter,
        params,
        { upsert: true })
      return await updatedItems;
    } catch (error) {
      console.log(error);
    }
  }
}
