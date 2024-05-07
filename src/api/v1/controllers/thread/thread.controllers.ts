import { Request, Response } from "express";

import { MESSAGE } from "../../../../constants/message";
import DatauriParser from "datauri/parser";
import ThreadModel from "../../../../models/thread.model";

const parser = new DatauriParser();

export const createThread = async (req: Request, res: Response) => {
	try {
		const { thread_message } = req.body;

		const newThread = new ThreadModel({
			thread_message: thread_message
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

export const getThread = async (req: Request, res: Response) => {
	try {
		const threadMessage = await ThreadModel.find();
		return res.status(200).json({
			message: MESSAGE.get.succ,
			result: threadMessage
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			message: MESSAGE.post.fail,
			error: error
		});
	}
};
