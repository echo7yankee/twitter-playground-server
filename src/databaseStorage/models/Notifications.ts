import mongoose, { Schema } from 'mongoose';
import { postSchema } from './Post';
const Schema: Schema = mongoose.Schema;

const notificationsSchema = new Schema(postSchema);

// tslint:disable-next-line: variable-name
export const Notification: string = mongoose.model('notification', notificationsSchema);
