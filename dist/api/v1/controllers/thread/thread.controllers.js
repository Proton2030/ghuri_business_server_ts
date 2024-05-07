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
exports.getThread = exports.createThread = void 0;
const message_1 = require("../../../../constants/message");
const parser_1 = __importDefault(require("datauri/parser"));
const thread_model_1 = __importDefault(require("../../../../models/thread.model"));
const parser = new parser_1.default();
const createThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { thread_message, name, profile_photo } = req.body;
        const newThread = new thread_model_1.default({
            thread_message: thread_message,
            name: name,
            profile_photo: profile_photo
        });
        const response = yield newThread.save();
        return res.status(200).json({
            message: message_1.MESSAGE.post.succ,
            result: response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.post.fail,
            error: error
        });
    }
});
exports.createThread = createThread;
const getThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const threadMessage = yield thread_model_1.default.find();
        return res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            result: threadMessage
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.post.fail,
            error: error
        });
    }
});
exports.getThread = getThread;
