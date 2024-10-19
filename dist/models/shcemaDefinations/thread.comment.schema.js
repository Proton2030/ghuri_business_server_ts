"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const schemaOption_1 = require("../../constants/model/schemaOption");
const user_model_1 = __importDefault(require("../user.model"));
const ThreadCommentSchema = new mongoose_1.Schema({
    comment_message: model_constant_1.default.requiredString,
    user_object_id: model_constant_1.default.requiredObjectId,
    post_id: model_constant_1.default.requiredObjectId
}, Object.assign(Object.assign({}, schemaOption_1.GENERAL_SCHEMA_OPTIONS), { toJSON: { virtuals: true }, toObject: { virtuals: true } }));
const userVirtualReference = {
    ref: user_model_1.default,
    localField: "user_object_id",
    foreignField: "_id",
    justOne: true
};
ThreadCommentSchema.virtual("user_details", userVirtualReference);
exports.default = ThreadCommentSchema;
