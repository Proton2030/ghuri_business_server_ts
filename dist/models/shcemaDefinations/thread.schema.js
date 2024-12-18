"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const schemaOption_1 = require("../../constants/model/schemaOption");
const user_model_1 = __importDefault(require("../user.model"));
const ThreadSchema = new mongoose_1.Schema({
    message_body: model_constant_1.default.requiredString,
    like_count: Object.assign(Object.assign({}, model_constant_1.default.optionalNullNumber), { default: 0 }),
    dislike_count: Object.assign(Object.assign({}, model_constant_1.default.optionalNullNumber), { default: 0 }),
    comments_count: Object.assign(Object.assign({}, model_constant_1.default.optionalNullNumber), { default: 0 }),
    message_media_url: model_constant_1.default.optionalNullString,
    is_approved: model_constant_1.default.optionalBoolean,
    user_object_id: model_constant_1.default.requiredObjectId,
    status: Object.assign(Object.assign({}, model_constant_1.default.optionalNullString), { default: "PENDING" })
}, Object.assign(Object.assign({}, schemaOption_1.GENERAL_SCHEMA_OPTIONS), { toJSON: { virtuals: true }, toObject: { virtuals: true } }));
const userVirtualReference = {
    ref: user_model_1.default,
    localField: "user_object_id",
    foreignField: "_id",
    justOne: true
};
ThreadSchema.virtual("user_details", userVirtualReference);
exports.default = ThreadSchema;
