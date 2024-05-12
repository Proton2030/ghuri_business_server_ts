import { Request, Response } from "express";

import { MESSAGE } from "../../../../constants/message";
import ThreadModel from "../../../../models/thread.model";
import ThreadCommentModel from "../../../../models/thread.comment.model";
import DataURIParser from "datauri/parser";
import { CloudinaryUpload } from "../../../../services/uploadFile/UploadFile";
import ThreadLikeModel from "../../../../models/threadLike.model";
import mongoose from "mongoose";

const parser = new DataURIParser();

export const createThread = async (req: Request, res: Response) => {
	try {
		const { message_body, user_object_id } = req.body;

		if (!req.files || !("images" in req.files)) {
			console.log("files", JSON.stringify(req.files));
			return res.status(404).json({
				message: MESSAGE.post.custom("Image files not found")
			});
		}

		// Ensure that req.files["images"] is of type Express.Multer.File[]
		if (!Array.isArray(req.files["images"])) {
			return res.status(400).json({
				message: MESSAGE.post.custom("Invalid image files")
			});
		}

		const images = await Promise.all(
			(req.files["images"] as Express.Multer.File[]).map(async (file: Express.Multer.File) => {
				// Convert the uploaded file to Data URI
				const dataUri: any = parser.format(file.originalname, file.buffer);

				// Upload the image to Cloudinary
				const cloudinaryUrl = await CloudinaryUpload(dataUri.content);

				return cloudinaryUrl;
			})
		);

		const newThread = new ThreadModel({
			message_body: message_body,
			user_object_id: user_object_id,
			message_media_url: images[0]
		});

		const response = await newThread.save();

		return res.status(200).json({
			message: MESSAGE.post.succ,
			result: response
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			message: MESSAGE.post.fail,
			error: error
		});
	}
};

export const getFilteredThread = async (req: Request, res: Response) => {
	try {
		const filter: any = req.query;
		const currentPage = parseInt(String(filter.page || "1")); // Parse page as integer

		const limit = 5;

		const startIndex = (currentPage - 1) * limit;

		const sortField = filter.sortField ? filter.sortField : "updatedAt";
		const user_object_id = filter.user_id ? filter.user_id : null;

		delete filter.page;
		delete filter.sortField;
		delete filter.user_id;

		console.log("===>filter", filter);

		const totalCount = await ThreadModel.countDocuments(filter);

		// const threadList = await ThreadModel.find(filter)
		// 	.sort({ [sortField]: -1 })
		// 	.populate("user_details")
		// 	.skip(startIndex)
		// 	.limit(limit);

		const threadList = await ThreadModel.aggregate([
			{ $match: filter },
			{ $sort: { [sortField]: -1 } },
			{ $skip: startIndex },
			{ $limit: limit },
			{ $lookup: { from: "users", localField: "user_object_id", foreignField: "_id", as: "user_details" } },
			{ $unwind: "$user_details" },
			{
				$lookup: {
					from: "thread_likes",
					let: { postId: "$_id", userId: new mongoose.Types.ObjectId(user_object_id) },
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
			message: MESSAGE.get.succ,
			pagination: {
				total: totalCount,
				currentPage: currentPage
			},
			result: threadList
		});
	} catch (error) {
		console.error("Error fetching businesses:", error);
		res.status(400).json({
			message: "Failed to retrieve businesses"
		});
	}
};

export const likeCount = async (req: Request, res: Response) => {
	try {
		const { postId, likeCount, dislikeCount } = req.body;

		const updatedPost = await ThreadModel.findByIdAndUpdate(
			postId,
			{
				like_count: likeCount,
				dislike_count: dislikeCount
			},
			{ new: true }
		);

		if (!updatedPost) {
			return res.status(404).json({
				message: MESSAGE.post.fail
			});
		}

		return res.status(200).json({
			message: MESSAGE.post.succ,
			result: updatedPost
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: MESSAGE.post.fail,
			error: error
		});
	}
};

export const createComment = async (req: Request, res: Response) => {
	try {
		const { comment_message, user_object_id, post_id } = req.body;

		const newComment = new ThreadCommentModel({
			comment_message: comment_message,
			user_object_id: user_object_id,
			post_id: post_id
		});

		const response = await newComment.save();
		if (response) {
			await ThreadModel.findByIdAndUpdate(post_id, {
				$inc: { comments_count: 1 }
			});
		}
		return res.status(200).json({
			message: MESSAGE.post.succ,
			result: response
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			message: MESSAGE.post.fail,
			error: error
		});
	}
};

export const getComment = async (req: Request, res: Response) => {
	try {
		const { post_id } = req.query;

		const response = await ThreadCommentModel.find({ post_id: post_id }).populate("user_details");

		return res.status(200).json({
			message: MESSAGE.get.succ,
			result: response
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			message: MESSAGE.get.fail,
			error: error
		});
	}
};

export const createLike = async (req: Request, res: Response) => {
	try {
		const { liked_status, user_object_id, post_id } = req.body;

		const is_liked = liked_status === "LIKE" ? true : false;
		const is_disliked = liked_status === "DISLIKE" ? true : false;

		const existingLike = await ThreadLikeModel.findOne({ user_object_id: user_object_id, post_id: post_id });

		if (existingLike) {
			if (existingLike.is_liked === is_liked && existingLike.is_disliked === is_disliked) {
				await ThreadLikeModel.findOneAndDelete({ user_object_id: user_object_id, post_id: post_id });
				await ThreadModel.findByIdAndUpdate(post_id, {
					$inc: { like_count: is_liked ? -1 : 0, dislike_count: is_disliked ? -1 : 0 }
				});
				return res.status(200).json({
					message: MESSAGE.post.succ,
					result: "Like removed"
				});
			}
			if (
				(existingLike.is_liked && existingLike.is_disliked !== is_disliked) ||
				(existingLike.is_disliked && existingLike.is_liked !== is_liked)
			) {
				console.log("---->existingLike", existingLike.is_disliked !== is_disliked);
				await ThreadLikeModel.findOneAndUpdate(
					{ user_object_id: user_object_id, post_id: post_id },
					{
						$set: {
							is_liked: is_liked,
							is_disliked: is_disliked
						}
					}
				);
				await ThreadModel.findByIdAndUpdate(post_id, {
					$inc: { like_count: is_liked ? 1 : -1, dislike_count: is_disliked ? 1 : -1 }
				});
				return res.status(200).json({
					message: MESSAGE.post.succ,
					result: "Like updated"
				});
			}
		}
		const newLike = new ThreadLikeModel({
			is_liked: is_liked,
			is_disliked: is_disliked,
			user_object_id: user_object_id,
			post_id: post_id
		});

		const response = await newLike.save();

		await ThreadModel.findByIdAndUpdate(post_id, {
			$inc: { like_count: is_liked ? 1 : -1, dislike_count: is_disliked ? 1 : -1 }
		});

		return res.status(200).json({
			message: MESSAGE.post.succ,
			result: response
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			message: MESSAGE.post.fail,
			error: error
		});
	}
};
