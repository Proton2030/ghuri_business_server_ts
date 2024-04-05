"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const add_controller_1 = require("../../controllers/add/add.controller");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.post("/createAdds", upload.fields([{ name: "images", maxCount: 10 }]), add_controller_1.createAdvertisement);
router.route("/editAdds/:_id").patch(add_controller_1.editAdvertisement);
router.route("/getAdds").get(add_controller_1.getAdvertisements);
router.route("/deleteAdds/:_id").delete(add_controller_1.deleteAdvertisement);
module.exports = router;
