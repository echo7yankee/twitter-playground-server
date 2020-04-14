"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
    social: {
        following: { type: Array },
        followingCount: { type: Number },
        followers: { type: Array },
        followersCount: { type: Number },
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.User = mongoose_1.default.model('user', userSchema);
//# sourceMappingURL=User.js.map