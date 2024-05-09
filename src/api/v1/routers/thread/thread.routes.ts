import express from "express";
import {
	createComment,
	createThread,
	getComment,
	getFilteredThread,
	likeCount
} from "../../controllers/thread/thread.controllers";

const router = express.Router();

router.post("/createThread", createThread);
router.route("/getThread").get(getFilteredThread);
router.route("/likeCount").patch(likeCount);
router.post("/createComment", createComment);
router.route("/getComment").get(getComment);
module.exports = router;
