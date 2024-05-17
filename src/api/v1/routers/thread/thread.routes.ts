import express from "express";
import {
	createComment,
	createLike,
	createThread,
	deleteThread,
	getComment,
	getFilteredThread,
	likeCount,
	updateThreadStatus
} from "../../controllers/thread/thread.controllers";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/createThread", upload.fields([{ name: "images", maxCount: 1 }]), createThread);
router.route("/getThread").get(getFilteredThread);
router.route("/likeCount").patch(likeCount);
router.post("/createComment", createComment);
router.post("/create-like", createLike);
router.patch("/update-status", updateThreadStatus);
router.delete("/delete-thread/:postId", deleteThread);
router.route("/getComment").get(getComment);

module.exports = router;
