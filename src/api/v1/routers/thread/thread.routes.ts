import express from "express";
import { createThread, getThread } from "../../controllers/thread/thread.controllers";

const router = express.Router();

router.post("/createThread", createThread);
router.route("/getThread").get(getThread);

module.exports = router;
