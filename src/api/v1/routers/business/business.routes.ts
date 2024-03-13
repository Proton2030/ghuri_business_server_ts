import express from "express";
import multer from "multer";
import {
	createBusiness,
	deleteBusinessById,
	editBusinessDetailsById,
	editBusinessStatusById,
	getBusiness,
	getFilteredBusiness,
	updateRatingBusiness
} from "../../controllers/business/business.controller";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/getBusiness", getBusiness);

router.get("/getFilteredBusiness", getFilteredBusiness);

router.post("/postBusiness", upload.fields([{ name: "images", maxCount: 10 }]), createBusiness);

router.patch("/editBusiness", editBusinessStatusById);

router.patch("/editBusinessDetailsById/:id", editBusinessDetailsById);

router.delete("/deleteBusiness", deleteBusinessById);

router.patch("/ratingBusiness" , updateRatingBusiness);


module.exports = router;
