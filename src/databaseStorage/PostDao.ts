
import { DAO } from './Dao';

export class PostDao extends DAO {
  public async updateAll(userId: string, profileImg: string) {
    try {
      const items = await this.client.model.updateMany(
        { userId },
        { $set: { profileImg } }, { multi: true }
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
