"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const user_model_1 = __importDefault(require("../../../../../models/user.model"));
const message_1 = require("../../../../../constants/message");
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const existingUser = yield user_model_1.default.findOne({ email: payload.email });
        if (existingUser) {
            yield user_model_1.default.findOneAndUpdate({ email: payload.email }, { $set: { device_token: payload.device_token } });
            return res.status(200).json({
                message: message_1.MESSAGE.post.succ,
                result: existingUser
            });
        }
        const newUser = new user_model_1.default(payload);
        const reseponse = yield newUser.save();
        return res.status(200).json({
            message: message_1.MESSAGE.post.succ,
            result: reseponse
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.post.fail,
            error
        });
    }
});
exports.userLogin = userLogin;
