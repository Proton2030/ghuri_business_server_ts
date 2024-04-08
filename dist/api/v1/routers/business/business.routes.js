"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const business_controller_1 = require("../../controllers/business/business.controller");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.get("/getBusiness", business_controller_1.getFilteredBusiness);
router.get("/getFilteredBusiness", business_controller_1.getFilteredBusiness);
router.get("/getSearchBusiness", business_controller_1.searchBusiness);
router.post("/postBusiness", upload.fields([{ name: "images", maxCount: 10 }]), business_controller_1.createBusiness);
router.patch("/editBusiness", business_controller_1.editBusinessStatusById);
router.patch("/editBusinessDetailsById/:id", business_controller_1.editBusinessDetailsById);
router.delete("/deleteBusiness", business_controller_1.deleteBusinessById);
router.patch("/ratingBusiness", business_controller_1.updateRatingBusiness);
router.get("/get-rating", business_controller_1.getBusinessRatingDetails);
// router.get("/sortestDistance", pincodeToLatLon);
router.get("/getNotification", business_controller_1.getNotification);
module.exports = router;