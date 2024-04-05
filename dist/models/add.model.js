"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const advertisement_shema_1 = __importDefault(require("./shcemaDefinations/advertisement.shema"));
const AddModel = (0, mongoose_1.model)("Advertisements", advertisement_shema_1.default);
exports.default = AddModel;
