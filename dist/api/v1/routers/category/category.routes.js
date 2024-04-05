"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../../controllers/category/category.controller");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.post("/createCategory", upload.fields([{ name: "images", maxCount: 10 }]), category_controller_1.createCategory);
router.patch("/editCategory/:_id", upload.fields([{ name: "images", maxCount: 10 }]), category_controller_1.editCategory);
router.route("/getCategory").get(category_controller_1.getCategories);
router.route("/deleteCategory/:_id").delete(category_controller_1.deleteCategory);
module.exports = router;
