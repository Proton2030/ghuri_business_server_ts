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
exports.SpaceUpload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// Configure DigitalOcean Spaces (using AWS SDK)
const s3 = new aws_sdk_1.default.S3({
    endpoint: new aws_sdk_1.default.Endpoint("https://gurigharangna.blr1.digitaloceanspaces.com"), // DigitalOcean Spaces endpoint (region-specific)
    accessKeyId: process.env.REACT_APP_DO_SPACES_KEY || "DO00W839CX4RVUNUKLZD", // Your Access Key from .env
    secretAccessKey: process.env.REACT_APP_DO_SPACES_SECRET || "mDjp2E9cZP99oN5mlo4mHAcBRjrg2RHX/X7cB/42oHM", // Your Secret Key from .env
});
// Function to upload image to DigitalOcean Spaces
const SpaceUpload = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("<=====DigitalOcean Spaces API called=====>");
    const fileName = `uploads/${Date.now()}_${imagePath.split("/").pop()}`; // Construct file name with a timestamp
    // Set the upload parameters
    const params = {
        Bucket: "gurigharangna", // Your Space name
        Key: fileName, // The name of the file to be saved in the Space
        Body: require("fs").createReadStream(imagePath), // Read the image file as a stream
        ACL: "public-read", // Make the file publicly accessible
        ContentType: "image/jpeg", // Adjust MIME type according to the image type (optional)
    };
    try {
        // Upload the file to DigitalOcean Spaces
        const result = yield s3.upload(params).promise();
        console.log("------>result", result.Location);
        return result.Location; // The URL of the uploaded image
    }
    catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Error uploading image");
    }
});
exports.SpaceUpload = SpaceUpload;
