import express from "express";
import { userRegistration } from "../../controllers/auth/registration/userRegistration.controller";

const router = express.Router();

router.route("/registration").post(userRegistration);

module.exports = router;
