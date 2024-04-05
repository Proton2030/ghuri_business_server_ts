import express from "express";
import { createCategory } from "../../controllers/category/category.controller";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/createCategory", upload.fields([{ name: "images", maxCount: 10 }]), createCategory);

module.exports = router;
