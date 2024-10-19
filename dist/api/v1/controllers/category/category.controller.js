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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getCategories = exports.editCategory = exports.createCategory = void 0;
const category_model_1 = __importDefault(require("../../../../models/category.model"));
const message_1 = require("../../../../constants/message");
const parser_1 = __importDefault(require("datauri/parser"));
const UploadFile_1 = require("../../../../services/uploadFile/UploadFile");
const parser = new parser_1.default();
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, is_active, sequence } = req.body;
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
        const newCategory = new category_model_1.default({
            category,
            is_active,
            sequence: Number(sequence),
            photo: images
        });
        const savedCategory = yield newCategory.save();
        res.status(200).json({
            message: message_1.MESSAGE.post.succ,
            result: savedCategory
        });
    }
    catch (error) {
        console.error("Error creating category:", error);
        res.status(400).json({
            message: message_1.MESSAGE.post.fail
        });
    }
});
exports.createCategory = createCategory;
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params;
        const { category, is_active, sequence } = req.body;
        let images = null;
        if (req.files && "images" in req.files) {
            images = req.files["images"].map((file) => {
                const dataUri = parser.format(file.originalname, file.buffer);
                return dataUri.content;
            });
        }
        let payload = {
            category,
            is_active,
            sequence: Number(sequence)
        };
        if (images) {
            payload = Object.assign(Object.assign({}, payload), { photo: images });
        }
        const updatedCategory = yield category_model_1.default.findByIdAndUpdate(_id, { $set: payload });
        if (!updatedCategory) {
            return res.status(404).json({
                message: message_1.MESSAGE.patch.fail
            });
        }
        res.status(200).json({
            message: message_1.MESSAGE.patch.succ,
            result: updatedCategory
        });
    }
    catch (error) {
        console.error("Error editing category:", error);
        res.status(400).json({
            message: message_1.MESSAGE.patch.fail
        });
    }
});
exports.editCategory = editCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = __rest(req.query, []);
        const categories = yield category_model_1.default.find(filter).sort({ sequence: 1 });
        res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            result: categories
        });
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(400).json({
            message: message_1.MESSAGE.get.fail
        });
    }
});
exports.getCategories = getCategories;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params;
        const deletedCategory = yield category_model_1.default.findByIdAndDelete(_id);
        if (!deletedCategory) {
            return res.status(404).json({
                message: message_1.MESSAGE.delete.fail
            });
        }
        res.status(200).json({
            message: message_1.MESSAGE.delete.succ,
            result: deletedCategory
        });
    }
    catch (error) {
        console.error("Error deleting category:", error);
        res.status(400).json({
            message: message_1.MESSAGE.delete.fail
        });
    }
});
exports.deleteCategory = deleteCategory;
