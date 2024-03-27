import express from "express";
import {
	createAdvertisement,
	deleteAdvertisement,
	editAdvertisement,
	getAdvertisements
} from "../../controllers/add/add.controller";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/createAdds", upload.fields([{ name: "images", maxCount: 10 }]), createAdvertisement);

router.route("/editAdds/:_id").patch(editAdvertisement);

router.route("/getAdds").get(getAdvertisements);

router.route("/deleteAdds/:_id").delete(deleteAdvertisement);

module.exports = router;
