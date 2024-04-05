"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.sendPushNotification = void 0;
const admin = __importStar(require("firebase-admin"));
const user_model_1 = __importDefault(require("../../models/user.model"));
// Replace the path with the actual path to your serviceAccountKey.json
const serviceAccount = require("../config/service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const sendPushNotification = (notification, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userInstance = yield user_model_1.default.findById(userId);
    if (userInstance) {
        if (userInstance.device_token.length > 5) {
            const message = {
                notification: {
                    title: notification.title,
                    body: notification.body,
                },
                token: userInstance.device_token
            };
            // Send the message
            admin.messaging().send(message)
                .then((response) => {
                console.log("Successfully sent message:", response);
            })
                .catch((error) => {
                console.error("Error sending message:", error);
            });
        }
        else {
            console.log("invalid Device Token");
        }
    }
    else {
        console.log("invalid userid");
    }
});
exports.sendPushNotification = sendPushNotification;
