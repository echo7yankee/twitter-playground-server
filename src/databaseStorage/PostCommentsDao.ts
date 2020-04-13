
import { DAO } from './Dao';

export class PostCommentDao extends DAO {
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
}
