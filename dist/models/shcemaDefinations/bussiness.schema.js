"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const schemaOption_1 = require("../../constants/model/schemaOption");
const user_model_1 = __importDefault(require("../user.model"));
const BussinessSchema = new mongoose_1.Schema({
    user_object_id: model_constant_1.default.optionalNullString,
    name: model_constant_1.default.optionalNullString,
    phone_no: model_constant_1.default.optionalNullString,
    description: model_constant_1.default.optionalNullString,
    location: model_constant_1.default.optionalNullString,
    category: model_constant_1.default.optionalNullString,
    avg_rate: Object.assign(Object.assign({}, model_constant_1.default.optionalNullNumber), { default: 0 }),
    no_of_rates: Object.assign(Object.assign({}, model_constant_1.default.optionalNullNumber), { default: 0 }),
    email: model_constant_1.default.optionalNullString,
    photo: model_constant_1.default.optionalNullObject,
    status: Object.assign(Object.assign({}, model_constant_1.default.optionalNullString), { default: "PENDING" }),
    is_active: model_constant_1.default.optionalBoolean,
    lat: model_constant_1.default.optionalNullNumber,
    lon: model_constant_1.default.optionalNullNumber
}, Object.assign(Object.assign({}, schemaOption_1.GENERAL_SCHEMA_OPTIONS), { toJSON: { virtuals: true }, toObject: { virtuals: true } }));
const userVirtualReference = {
    ref: user_model_1.default,
    localField: "user_object_id",
    foreignField: "_id",
    justOne: true
};
BussinessSchema.virtual("user_details", userVirtualReference);
exports.default = BussinessSchema;
