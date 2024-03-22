import { Request, Response } from "express";
import CategoryModel from "../../../../models/category.model";
import { MESSAGE } from "../../../../constants/message";

export const createCategory = async (req: Request, res: Response) => {
	try {
		const { category, is_active } = req.body;

		const newCategory = new CategoryModel({
			category,
			is_active
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

		const updatedCategory = await CategoryModel.findByIdAndUpdate(_id, { category, is_active }, { new: true });

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
