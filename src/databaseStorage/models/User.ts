import mongoose, { Schema } from 'mongoose';
const Schema: Schema = mongoose.Schema;

const userSchema = new Schema({
  fName: {
    type: String,
    required: true,
    min: 2
  },
  lName: {
    type: String,
    required: true,
    min: 2
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  bio: {
    type: String,
  },
  age: {
    day: { type: String },
    month: { type: String },
    year: { type: String },
    privacy: {
      monthAndDay: { type: String },
      year: { type: String }
    }
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 2
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 2
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
export const User: string = mongoose.model('user', userSchema);
