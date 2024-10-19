"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteThread = exports.updateThreadStatus = exports.createLike = exports.getComment = exports.createComment = exports.likeCount = exports.getFilteredThread = exports.createThread = void 0;
const message_1 = require("../../../../constants/message");
const thread_model_1 = __importDefault(require("../../../../models/thread.model"));
const thread_comment_model_1 = __importDefault(require("../../../../models/thread.comment.model"));
const parser_1 = __importDefault(require("datauri/parser"));
const UploadFile_1 = require("../../../../services/uploadFile/UploadFile");
const threadLike_model_1 = __importDefault(require("../../../../models/threadLike.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const notification_service_1 = require("../../../../services/notification/notification.service");
const parser = new parser_1.default();
const createThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message_body, user_object_id } = req.body;
        // if (!req.files || !("images" in req.files)) {
        // 	console.log("files", JSON.stringify(req.files));
        // 	return res.status(404).json({
        // 		message: MESSAGE.post.custom("Image files not found")
        // 	});
        // }
        // Ensure that req.files["images"] is of type Express.Multer.File[]
        // if (!Array.isArray(req.files["images"])) {
        // 	return res.status(400).json({
        // 		message: MESSAGE.post.custom("Invalid image files")
        // 	});
        // }
        let images = [];
        if (req.files && ("images" in req.files) && Array.isArray(req.files["images"])) {
            images = yield Promise.all(req.files["images"].map((file) => __awaiter(void 0, void 0, void 0, function* () {
                // Convert the uploaded file to Data URI
                const dataUri = parser.format(file.originalname, file.buffer);
                // Upload the image to Cloudinary
                const cloudinaryUrl = yield (0, UploadFile_1.SpaceUpload)(dataUri.content);
                return cloudinaryUrl;
            })));
        }
        const newThread = new thread_model_1.default({
            message_body: message_body,
            user_object_id: user_object_id,
            message_media_url: images.length > 0 ? images[0] : null
        });
        const response = yield newThread.save();
        return res.status(200).json({
            message: message_1.MESSAGE.post.succ,
            result: response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.post.fail,
            error: error
        });
    }
});
exports.createThread = createThread;
const getFilteredThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filter = req.query;
        const currentPage = parseInt(String(filter.page || "1")); // Parse page as integer
        const limit = 5;
        const startIndex = (currentPage - 1) * limit;
        const sortField = filter.sortField ? filter.sortField : "updatedAt";
        const user_id = filter.user_id ? filter.user_id : null;
        delete filter.page;
        delete filter.sortField;
        delete filter.user_id;
        if (filter.user_object_id) {
            filter = Object.assign(Object.assign({}, filter), { user_object_id: new mongoose_1.default.Types.ObjectId(filter.user_object_id) });
        }
        console.log("===>filter", filter);
        const totalCount = yield thread_model_1.default.countDocuments(filter);
        // const threadList = await ThreadModel.find(filter)
        // 	.sort({ [sortField]: -1 })
        // 	.populate("user_details")
        // 	.skip(startIndex)
        // 	.limit(limit);
        const threadList = yield thread_model_1.default.aggregate([
            { $match: filter },
            { $sort: { [sortField]: -1 } },
            { $skip: startIndex },
            { $limit: limit },
            { $lookup: { from: "users", localField: "user_object_id", foreignField: "_id", as: "user_details" } },
            { $unwind: "$user_details" },
            {
                $lookup: {
                    from: "thread_likes",
                    let: { postId: "$_id", userId: new mongoose_1.default.Types.ObjectId(user_id) },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [{ $eq: ["$post_id", "$$postId"] }, { $eq: ["$user_object_id", "$$userId"] }]
                                }
                            }
                        }
                    ],
                    as: "like_details"
                }
            },
            {
                $addFields: {
                    is_liked: {
                        $cond: {
                            if: { $gt: [{ $size: "$like_details" }, 0] },
                            then: { $arrayElemAt: ["$like_details.is_liked", 0] },
                            else: false
                        }
                    },
                    is_disliked: {
                        $cond: {
                            if: { $gt: [{ $size: "$like_details" }, 0] },
                            then: { $arrayElemAt: ["$like_details.is_disliked", 0] },
                            else: false
                        }
                    }
                }
            },
            {
                $project: {
                    like_details: 0
                }
            }
        ]);
        res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            pagination: {
                total: totalCount,
                currentPage: currentPage
            },
            result: threadList
        });
    }
    catch (error) {
        console.error("Error fetching businesses:", error);
        res.status(400).json({
            message: "Failed to retrieve businesses"
        });
    }
});
exports.getFilteredThread = getFilteredThread;
const likeCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, likeCount, dislikeCount } = req.body;
        const updatedPost = yield thread_model_1.default.findByIdAndUpdate(postId, {
            like_count: likeCount,
            dislike_count: dislikeCount
        }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({
                message: message_1.MESSAGE.post.fail
            });
        }
        return res.status(200).json({
            message: message_1.MESSAGE.post.succ,
            result: updatedPost
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: message_1.MESSAGE.post.fail,
            error: error
        });
    }
});
exports.likeCount = likeCount;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment_message, user_object_id, post_id } = req.body;
        const newComment = new thread_comment_model_1.default({
            comment_message: comment_message,
            user_object_id: user_object_id,
            post_id: post_id
        });
        const response = yield newComment.save();
        if (response) {
            yield thread_model_1.default.findByIdAndUpdate(post_id, {
                $inc: { comments_count: 1 }
            });
        }
        return res.status(200).json({
            message: message_1.MESSAGE.post.succ,
            result: response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.post.fail,
            error: error
        });
    }
});
exports.createComment = createComment;
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { post_id } = req.query;
        const response = yield thread_comment_model_1.default.find({ post_id: post_id }).populate("user_details");
        return res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            result: response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.get.fail,
            error: error
        });
    }
});
exports.getComment = getComment;
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { liked_status, user_object_id, post_id } = req.body;
        const is_liked = liked_status === "LIKE" ? true : false;
        const is_disliked = liked_status === "DISLIKE" ? true : false;
        const existingLike = yield threadLike_model_1.default.findOne({ user_object_id: user_object_id, post_id: post_id });
        if (existingLike) {
            if (existingLike.is_liked === is_liked && existingLike.is_disliked === is_disliked) {
                yield threadLike_model_1.default.findOneAndDelete({ user_object_id: user_object_id, post_id: post_id });
                // await ThreadModel.findByIdAndUpdate(post_id, {
                // 	$inc: { like_count: is_liked ? -1 : 0, dislike_count: is_disliked ? -1 : 0 }
                // });
                return res.status(200).json({
                    message: message_1.MESSAGE.post.succ,
                    result: "Like removed"
                });
            }
            if ((existingLike.is_liked && existingLike.is_disliked !== is_disliked) ||
                (existingLike.is_disliked && existingLike.is_liked !== is_liked)) {
                console.log("---->existingLike", existingLike.is_disliked !== is_disliked);
                yield threadLike_model_1.default.findOneAndUpdate({ user_object_id: user_object_id, post_id: post_id }, {
                    $set: {
                        is_liked: is_liked,
                        is_disliked: is_disliked
                    }
                });
                const no_of_likes = yield threadLike_model_1.default.countDocuments({ post_id: post_id, is_liked: true });
                const no_of_dislikes = yield threadLike_model_1.default.countDocuments({ post_id: post_id, is_disliked: true });
                yield thread_model_1.default.findByIdAndUpdate(post_id, {
                    $set: { like_count: no_of_likes, dislike_count: no_of_dislikes }
                });
                return res.status(200).json({
                    message: message_1.MESSAGE.post.succ,
                    result: "Like updated"
                });
            }
        }
        const newLike = new threadLike_model_1.default({
            is_liked: is_liked,
            is_disliked: is_disliked,
            user_object_id: user_object_id,
            post_id: post_id
        });
        const response = yield newLike.save();
        // await ThreadModel.findByIdAndUpdate(post_id, {
        // 	$inc: { like_count: is_liked ? 1 : 0, dislike_count: is_disliked ? 1 : 0 }
        // });
        const no_of_likes = yield threadLike_model_1.default.countDocuments({ post_id: post_id, is_liked: true });
        const no_of_dislikes = yield threadLike_model_1.default.countDocuments({ post_id: post_id, is_disliked: true });
        yield thread_model_1.default.findByIdAndUpdate(post_id, {
            $set: { like_count: no_of_likes, dislike_count: no_of_dislikes }
        });
        return res.status(200).json({
            message: message_1.MESSAGE.post.succ,
            result: response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.post.fail,
            error: error
        });
    }
});
exports.createLike = createLike;
const updateThreadStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, status } = req.body;
        const updatedPost = yield thread_model_1.default.findByIdAndUpdate(postId, {
            $set: { status: status }
        });
        const post = yield thread_model_1.default.findById(postId);
        if (post) {
            if (status === "ACTIVE") {
                console.log("====>Active");
                yield (0, notification_service_1.createNotification)(String(post.user_object_id), "Your Chat Post is approved by Admin");
            }
            else if (status === "REJECTED") {
                console.log("====>reject");
                yield (0, notification_service_1.createNotification)(String(post.user_object_id), "Your Chat Post is rejected by Admin");
            }
        }
        return res.status(200).json({
            message: message_1.MESSAGE.patch.succ,
            result: updatedPost
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.post.fail,
            error: error
        });
    }
});
exports.updateThreadStatus = updateThreadStatus;
const deleteThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const response = yield thread_model_1.default.findByIdAndDelete(postId);
        return res.status(200).json({
            message: message_1.MESSAGE.delete.succ,
            result: response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            message: message_1.MESSAGE.delete.fail,
            error: error
        });
    }
});
exports.deleteThread = deleteThread;
