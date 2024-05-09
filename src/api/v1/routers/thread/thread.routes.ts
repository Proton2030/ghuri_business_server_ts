import express from "express";
import { createComment, createThread, getFilteredThread, likeCount } from "../../controllers/thread/thread.controllers";

const router = express.Router();

router.post("/createThread", createThread);
router.route("/getThread").get(getFilteredThread);
router.route("/likeCount").patch(likeCount);
router.post("/createComment", createComment);
module.exports = router;
