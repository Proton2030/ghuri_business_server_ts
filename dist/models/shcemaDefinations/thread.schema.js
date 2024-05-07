"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const ThreadSchema = new mongoose_1.Schema({
    thread_message: model_constant_1.default.requiredString,
    name: model_constant_1.default.requiredString,
    profile_photo: model_constant_1.default.requiredString
});
exports.default = ThreadSchema;
