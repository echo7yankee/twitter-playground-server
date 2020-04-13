"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
function registerValidation(data) {
    const schema = {
        confirmPassword: joi_1.default.any()
            .valid(joi_1.default.ref('password'))
            .required(),
        email: joi_1.default.string()
            .min(6)
            .required()
            .email(),
        fName: joi_1.default.string()
            .min(2)
            .required(),
        lName: joi_1.default.string()
            .min(2)
            .required(),
        password: joi_1.default.string()
            .min(6)
            .required(),
    };
    return joi_1.default.validate(data, schema);
}
exports.registerValidation = registerValidation;
;
function loginValidation(data) {
    const schema = {
        email: joi_1.default.string()
            .min(6)
            .required()
            .email(),
        password: joi_1.default.string()
            .required()
    };
    return joi_1.default.validate(data, schema);
}
exports.loginValidation = loginValidation;
;
//# sourceMappingURL=Validation.js.map