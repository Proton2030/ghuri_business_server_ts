import express from "express";
import multer from "multer";
import {
	createBusiness,
	deleteBusinessById,
	editBusinessDetailsById,
	editBusinessStatusById,
	getBusiness,
	getBusinessRatingDetails,
	getFilteredBusiness,
	getNearbyBusiness,
	getNotification,
	searchBusiness,
	// pincodeToLatLon,
	updateRatingBusiness
} from "../../controllers/business/business.controller";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/getBusiness", getFilteredBusiness);

router.get("/getFilteredBusiness", getFilteredBusiness);

router.get("/getSearchBusiness", searchBusiness);

router.get("/getNearbyBusiness", getNearbyBusiness);

router.post("/postBusiness", upload.fields([{ name: "images", maxCount: 10 }]), createBusiness);

router.patch("/editBusiness", editBusinessStatusById);

router.patch("/editBusinessDetailsById/:id", editBusinessDetailsById);

router.delete("/deleteBusiness", deleteBusinessById);

router.patch("/ratingBusiness", updateRatingBusiness);

router.get("/get-rating", getBusinessRatingDetails);

// router.get("/sortestDistance", pincodeToLatLon);

router.get("/getNotification", getNotification);
module.exports = router;
