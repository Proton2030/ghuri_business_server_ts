"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notification_schema_1 = __importDefault(require("./shcemaDefinations/notification.schema"));
const NotificationModel = (0, mongoose_1.model)("Notification", notification_schema_1.default);
exports.default = NotificationModel;
