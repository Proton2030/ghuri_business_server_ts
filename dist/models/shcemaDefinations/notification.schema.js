"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const notificationSchema = new mongoose_1.Schema({
    user_object_id: model_constant_1.default.requiredObjectId,
    notification_title: model_constant_1.default.requiredString
});
exports.default = notificationSchema;
