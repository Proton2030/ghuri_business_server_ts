"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = void 0;
const notification_model_1 = __importDefault(require("../../models/notification.model"));
const sendNotification_1 = require("./sendNotification");
function createNotification(userObjectId, notificationTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newNotification = new notification_model_1.default({
                user_object_id: userObjectId,
                notification_title: notificationTitle
            });
            yield (0, sendNotification_1.sendPushNotification)({
                body: notificationTitle,
                title: notificationTitle
            }, userObjectId);
            const savedNotification = yield newNotification.save();
            return savedNotification;
        }
        catch (error) {
            throw new Error(`Error creating notification: ${error}`);
        }
    });
}
exports.createNotification = createNotification;
