"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const threadLike_schema_1 = __importDefault(require("./shcemaDefinations/threadLike.schema"));
const ThreadLikeModel = (0, mongoose_1.model)("thread_likes", threadLike_schema_1.default);
exports.default = ThreadLikeModel;
