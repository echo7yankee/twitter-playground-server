"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function createToken(params) {
    return await jsonwebtoken_1.default.sign(params, process.env.TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1h',
    });
}
exports.createToken = createToken;
//# sourceMappingURL=jwt.js.map