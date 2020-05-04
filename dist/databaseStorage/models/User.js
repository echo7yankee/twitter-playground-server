"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.userSchema = new Schema({
    fName: { type: String, required: true, min: 2 },
    lName: { type: String, required: true, min: 2 },
    username: { type: String, required: true },
    location: { type: String, },
    website: { type: String, },
    bio: { type: String, },
    social: {
        following: { type: Array },
        followingCount: { type: Number },
        followers: { type: Array },
        followersCount: { type: Number },
        usersToMessage: { type: Array },
    },
    age: {
        day: { type: String },
        month: { type: String },
        year: { type: String },
        privacy: {
            monthAndDay: { type: String },
            privacyYear: { type: String }
        }
    },
    email: { type: String, required: true },
    password: {
        type: String, min: 2
    },
    confirmPassword: { type: String, min: 2 },
    profileImg: { type: String, },
    createdAt: { type: Date, default: Date.now }
});
exports.User = mongoose_1.default.model('user', exports.userSchema);
//# sourceMappingURL=User.js.map