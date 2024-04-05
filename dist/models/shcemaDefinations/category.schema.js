"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const CategorySchema = new mongoose_1.Schema({
    category: model_constant_1.default.requiredString,
    is_active: model_constant_1.default.optionalBoolean,
    photo: model_constant_1.default.optionalNullObject
});
exports.default = CategorySchema;
