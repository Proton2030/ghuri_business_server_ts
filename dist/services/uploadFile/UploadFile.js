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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryUpload = void 0;
const cloudinary = require("cloudinary").v2; // Configure Cloudinary
cloudinary.config({
    cloud_name: "dg8myn77o",
    api_key: "666889283813579",
    api_secret: "0N6MGT_3jSRpNKoIr4Wmgg3zxV4"
});
// Function to upload image to Cloudinary
const CloudinaryUpload = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("<=====cloudinary api called=====>");
    try {
        // Upload image to Cloudinary
        const result = yield cloudinary.uploader.upload(imagePath);
        console.log("------>result", result.url);
        return result.url;
    }
    catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Error uploading image");
    }
});
exports.CloudinaryUpload = CloudinaryUpload;
