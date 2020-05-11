import mongoose, { Schema } from 'mongoose';
const Schema: Schema = mongoose.Schema;

const messagesSchema = new Schema({
  roomId: { type: String },
  messages: { type: Array },
});

// tslint:disable-next-line: variable-name
export const Messages: string = mongoose.model('messages', messagesSchema);
