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
exports.getAdvertisements = exports.editAdvertisement = exports.deleteAdvertisement = exports.createAdvertisement = void 0;
const add_model_1 = __importDefault(require("../../../../models/add.model"));
const message_1 = require("../../../../constants/message");
const parser_1 = __importDefault(require("datauri/parser"));
const UploadFile_1 = require("../../../../services/uploadFile/UploadFile");
const parser = new parser_1.default();
const createAdvertisement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { target_url, active } = req.body;
        if (!req.files || !("images" in req.files)) {
            console.log("files", JSON.stringify(req.files));
            return res.status(404).json({
                message: message_1.MESSAGE.post.custom("Image files not found")
            });
        }
        // Ensure that req.files["images"] is of type Express.Multer.File[]
        if (!Array.isArray(req.files["images"])) {
            return res.status(400).json({
                message: message_1.MESSAGE.post.custom("Invalid image files")
            });
        }
        const images = yield Promise.all(req.files["images"].map((file) => __awaiter(void 0, void 0, void 0, function* () {
            // Convert the uploaded file to Data URI
            const dataUri = parser.format(file.originalname, file.buffer);
            // Upload the image to Cloudinary
            const cloudinaryUrl = yield (0, UploadFile_1.SpaceUpload)(dataUri.content);
            return cloudinaryUrl;
        })));
        const newAdvertisement = new add_model_1.default({
            photo: images,
            target_url: target_url,
            active: active
        });
        const response = yield newAdvertisement.save();
        return res.status(200).json({
            message: message_1.MESSAGE.post.succ,
            result: response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.post.fail,
            error: error
        });
    }
});
exports.createAdvertisement = createAdvertisement;
const deleteAdvertisement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params;
        const deletedAd = yield add_model_1.default.findByIdAndDelete(_id);
        if (!deletedAd) {
            return res.status(404).json({
                message: message_1.MESSAGE.delete.fail
            });
        }
        return res.status(200).json({
            message: message_1.MESSAGE.delete.succ,
            result: deletedAd
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.delete.fail,
            error: error
        });
    }
});
exports.deleteAdvertisement = deleteAdvertisement;
const editAdvertisement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adId = req.params.id;
        const { image_url, target_url, active } = req.body;
        const updatedAd = yield add_model_1.default.findByIdAndUpdate(adId, {
            image_url: image_url,
            target_url: target_url,
            active: active
        }, { new: true });
        if (!updatedAd) {
            return res.status(404).json({
                message: message_1.MESSAGE.patch.fail
            });
        }
        return res.status(200).json({
            message: message_1.MESSAGE.patch.succ,
            result: updatedAd
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.patch.fail,
            error: error
        });
    }
});
exports.editAdvertisement = editAdvertisement;
const getAdvertisements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const advertisements = yield add_model_1.default.find();
        return res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            result: advertisements
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.get.fail,
            error: error
        });
    }
});
exports.getAdvertisements = getAdvertisements;
