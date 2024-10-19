"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const thread_comment_schema_1 = __importDefault(require("./shcemaDefinations/thread.comment.schema"));
const ThreadCommentModel = (0, mongoose_1.model)("ThreadCommentSchema", thread_comment_schema_1.default);
exports.default = ThreadCommentModel;
