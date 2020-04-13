import mongoose, { Schema } from 'mongoose';
const Schema: Schema = mongoose.Schema;

const postSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: String,
    required: true
  },
  postComments: {
    type: Array,
  },
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
  likes: {
    type: Number
  },
  userId: {
    type: String,
    required: true
  },
  userProfileImg: {
    type: String,
  }
});

// tslint:disable-next-line: variable-name
export const Post: string = mongoose.model('post', postSchema);
