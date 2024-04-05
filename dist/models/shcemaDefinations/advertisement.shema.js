"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const AdvertisementSchema = new mongoose_1.Schema({
    photo: model_constant_1.default.optionalNullObject,
    target_url: model_constant_1.default.requiredString,
    active: model_constant_1.default.requiredBoolean
});
exports.default = AdvertisementSchema;
