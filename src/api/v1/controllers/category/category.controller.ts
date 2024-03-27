import { Request, Response } from "express";
import CategoryModel from "../../../../models/category.model";
import { MESSAGE } from "../../../../constants/message";
import DatauriParser from "datauri/parser";

const parser = new DatauriParser();

export const createCategory = async (req: Request, res: Response) => {
	try {
		const { category, is_active } = req.body;
		if (!req.files || !("images" in req.files)) {
			console.log("files", JSON.stringify(req.files));
			return res.status(404).json({
				message: MESSAGE.post.custom("Image files not found")
			});
		}

		const images = (req.files["images"] as Express.Multer.File[]).map((file: Express.Multer.File) => {
			const dataUri = parser.format(file.originalname, file.buffer);
			return dataUri.content;
		});

		const newCategory = new CategoryModel({
			category,
			is_active,
			photo: images
		});

		const savedCategory = await newCategory.save();

		res.status(200).json({
			message: MESSAGE.post.succ,
			result: savedCategory
		});
	} catch (error) {
		console.error("Error creating category:", error);
		res.status(400).json({
			message: MESSAGE.post.fail
		});
	}
};

export const editCategory = async (req: Request, res: Response) => {
	try {
		const _id = req.params;

		const { category, is_active } = req.body;
		if (!req.files || !("images" in req.files)) {
			console.log("files", JSON.stringify(req.files));
			return res.status(404).json({
				message: MESSAGE.post.custom("Image files not found")
			});
		}

		const images = (req.files["images"] as Express.Multer.File[]).map((file: Express.Multer.File) => {
			const dataUri = parser.format(file.originalname, file.buffer);
			return dataUri.content;
		});

		const updatedCategory = await CategoryModel.findByIdAndUpdate(
			_id,
			{ category, is_active, photo: images },
			{ new: true }
		);

		if (!updatedCategory) {
			return res.status(404).json({
				message: MESSAGE.patch.fail
			});
		}

		res.status(200).json({
			message: MESSAGE.patch.succ,
			result: updatedCategory
		});
	} catch (error) {
		console.error("Error editing category:", error);
		res.status(400).json({
			message: MESSAGE.patch.fail
		});
	}
};

export const getCategories = async (req: Request, res: Response) => {
	try {
		const { ...filter } = req.query;

		const categories = await CategoryModel.find(filter);
		res.status(200).json({
			message: MESSAGE.get.succ,
			result: categories
		});
	} catch (error) {
		console.error("Error fetching categories:", error);
		res.status(400).json({
			message: MESSAGE.get.fail
		});
	}
};

export const deleteCategory = async (req: Request, res: Response) => {
	try {
		const _id = req.params;

		const deletedCategory = await CategoryModel.findByIdAndDelete(_id);

		if (!deletedCategory) {
			return res.status(404).json({
				message: MESSAGE.delete.fail
			});
		}

		res.status(200).json({
			message: MESSAGE.delete.succ,
			result: deletedCategory
		});
	} catch (error) {
		console.error("Error deleting category:", error);
		res.status(400).json({
			message: MESSAGE.delete.fail
		});
	}
};
