import mongoose, { Schema } from 'mongoose';
const Schema: Schema = mongoose.Schema;

const PostCommentSchema = new Schema({
  userId: {
    type: String,
  },
  postId: {
    type: String,
  },
  postReply: {
    type: String
  },
  username: {
    type: String
  },
  profileImg: {
    type: String,
  },
  // profileImg: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// tslint:disable-next-line: variable-name
export const PostComment: string = mongoose.model('postcomment', PostCommentSchema);
