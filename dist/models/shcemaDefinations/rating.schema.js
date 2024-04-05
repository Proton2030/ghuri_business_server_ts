"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const user_model_1 = __importDefault(require("../user.model"));
const ratingSchema = new mongoose_1.Schema({
    business_object_id: model_constant_1.default.requiredObjectId,
    user_object_id: model_constant_1.default.requiredObjectId,
    rating: model_constant_1.default.optionalNullNumber
});
const userVirtualReference = {
    ref: user_model_1.default,
    localField: "user_object_id",
    foreignField: "_id",
    justOne: true
};
ratingSchema.virtual("user_details", userVirtualReference);
exports.default = ratingSchema;
