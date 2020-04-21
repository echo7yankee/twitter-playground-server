import mongoose, { Schema } from 'mongoose';
import { userSchema } from './User';
const Schema: Schema = mongoose.Schema;

const postSchema = new Schema({
  username: { type: String, required: true },
  profileImg: { type: String, },
  createdAt: { type: Date, default: Date.now },
  comment: { type: String, required: true },
  postComments: { type: Array, },
  poll: {
    whoVoted: { type: Array },
    pollLengthDays: { type: Number },
    pollLengthHours: { type: Number },
    pollLengthMinutes: { type: Number },
    choices: { type: Array },
  },
  whoLiked: {
    type: Array,
  },
  likes: { type: Number },
  userId: { type: String, required: true },
  uuid: { type: String },
  user: userSchema,
});

// tslint:disable-next-line: variable-name
export const Post: string = mongoose.model('post', postSchema);
