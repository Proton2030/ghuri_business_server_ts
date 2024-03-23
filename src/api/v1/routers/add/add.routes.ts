import express from "express";
import {
	createAdvertisement,
	deleteAdvertisement,
	editAdvertisement,
	getAdvertisements
} from "../../controllers/add/add.controller";

const router = express.Router();

router.route("/createAdds").post(createAdvertisement);

router.route("/editAdds/:_id").patch(editAdvertisement);

router.route("/getAdds").get(getAdvertisements);

router.route("/deleteAdds/:_id").delete(deleteAdvertisement);

module.exports = router;
