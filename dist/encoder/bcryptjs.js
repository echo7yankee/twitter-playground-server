"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function encryptPassword(password, confirmPassword) {
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    const hashedConfirmPassword = await bcryptjs_1.default.hash(confirmPassword, salt);
    const hashedPasswords = { hashedPassword, hashedConfirmPassword };
    return hashedPasswords;
}
exports.encryptPassword = encryptPassword;
async function comparePassword(password, userPassword) {
    return await bcryptjs_1.default.compare(password, userPassword);
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=bcryptjs.js.map