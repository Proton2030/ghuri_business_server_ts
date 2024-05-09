import express from "express";
import { createComment, createThread, getThread, likeCount } from "../../controllers/thread/thread.controllers";

const router = express.Router();

router.post("/createThread", createThread);
router.route("/getThread").get(getThread);
router.route("/likeCount").patch(likeCount);
router.post("/createComment", createComment);
module.exports = router;
