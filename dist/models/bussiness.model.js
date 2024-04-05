"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bussiness_schema_1 = __importDefault(require("./shcemaDefinations/bussiness.schema"));
const BussinessModel = (0, mongoose_1.model)("Bussiness", bussiness_schema_1.default);
exports.default = BussinessModel;
