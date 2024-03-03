import express from "express";
import { userLogin } from "../../controllers/auth/login/userLogin";
const router = express.Router();

router.route("/login").post(userLogin);



module.exports = router;
