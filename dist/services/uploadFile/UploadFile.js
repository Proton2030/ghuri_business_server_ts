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
exports.SpaceUpload = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
// Configure DigitalOcean Spaces (using AWS SDK v3)
const s3Client = new client_s3_1.S3Client({
    endpoint: "https://blr1.digitaloceanspaces.com", // Use region-specific endpoint without the bucket name
    region: "us-east-1", // DigitalOcean uses 'us-east-1' by default
    credentials: {
        accessKeyId: process.env.REACT_APP_DO_SPACES_KEY || "DO00W839CX4RVUNUKLZD",
        secretAccessKey: process.env.REACT_APP_DO_SPACES_SECRET || "mDjp2E9cZP99oN5mlo4mHAcBRjrg2RHX/X7cB/42oHM",
    },
});
// Function to upload image to DigitalOcean Spaces
const SpaceUpload = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("<=====DigitalOcean Spaces API called=====>");
    const fileName = `uploads/${Date.now()}_${imagePath.split("/").pop()}`; // Construct file name with a timestamp
    // Set the upload parameters
    const params = {
        Bucket: "gurigharangna", // Your Space name
        Key: fileName, // The name of the file to be saved in the bucket
        Body: Buffer.from(imagePath.replace(/^data:image\/\w+;base64,/, ""), "base64"), // Remove the data URI scheme and decode the base64 string
        ContentEncoding: "base64", // Specify that the content is base64 encoded
        ACL: "public-read", // Make the file publicly accessible
        ContentType: "image/jpeg", // Adjust MIME type according to the image type (optional)
    };
    try {
        // Upload the file to DigitalOcean Spaces
        const command = new client_s3_1.PutObjectCommand(params);
        const result = yield s3Client.send(command);
        console.log("------>result", result); // result should contain status and info, but no "Location"
        const fileUrl = `https://gurigharangna.blr1.digitaloceanspaces.com/${fileName}`;
        return fileUrl; // The URL of the uploaded image
    }
    catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Error uploading image");
    }
});
exports.SpaceUpload = SpaceUpload;
