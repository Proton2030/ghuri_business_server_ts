import express from "express";
import {
	createCategory,
	deleteCategory,
	editCategory,
	getCategories
} from "../../controllers/category/category.controller";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/createCategory", upload.fields([{ name: "images", maxCount: 10 }]), createCategory);

router.patch("/editCategory/:_id", upload.fields([{ name: "images", maxCount: 10 }]), editCategory);

router.route("/getCategory").get(getCategories);

router.route("/deleteCategory/:_id").delete(deleteCategory);

module.exports = router;
