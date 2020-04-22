
import { DAO } from './Dao';

export class PostDao extends DAO {
  public async updateAll(filter: any, params: any) {
    try {
      const items = await this.client.model.updateMany(
        filter,
        { $set: params }, { multi: true }
      );
      return items;
    } catch (error) {
      console.log(error);
    }
  }

  public async findAndUpdate(postId, updatedItem) {
    try {
      const updatedItems = await this.client.model.findOneAndUpdate(
        { _id: postId },
        { postComments: updatedItem },
        { upsert: true })
      return await updatedItems;
    } catch (error) {
      console.log(error);
    }
  }
}
