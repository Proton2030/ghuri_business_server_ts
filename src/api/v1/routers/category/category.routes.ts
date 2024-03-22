import express from "express";
import {
	createCategory,
	deleteCategory,
	editCategory,
	getCategories
} from "../../controllers/category/category.controller";
const router = express.Router();

router.route("/createCategory").post(createCategory);

router.route("/editCategory/:_id").patch(editCategory);

router.route("/getCategory").get(getCategories);

router.route("/deleteCategory/:_id").delete(deleteCategory);

module.exports = router;
