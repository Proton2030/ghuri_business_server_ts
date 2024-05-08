import express from "express";
import { createThread, getThread, likeCount } from "../../controllers/thread/thread.controllers";

const router = express.Router();

router.post("/createThread", createThread);
router.route("/getThread").get(getThread);
router.route("/likeCount").patch(likeCount);

module.exports = router;
