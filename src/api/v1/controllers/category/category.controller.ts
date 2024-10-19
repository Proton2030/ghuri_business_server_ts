import { Request, Response } from "express";
import CategoryModel from "../../../../models/category.model";
import { MESSAGE } from "../../../../constants/message";
import DatauriParser from "datauri/parser";
import { SpaceUpload } from "../../../../services/uploadFile/UploadFile";

const parser = new DatauriParser();

export const createCategory = async (req: Request, res: Response) => {
	try {
		const { category, is_active, sequence } = req.body;
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
				const cloudinaryUrl = await SpaceUpload(dataUri.content);

				return cloudinaryUrl;
			})
		);

		const newCategory = new CategoryModel({
			category,
			is_active,
			sequence : Number(sequence),
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
		const { category, is_active, sequence } = req.body;
		let images: any = null;
		if (req.files && "images" in req.files) {
			images = (req.files["images"] as Express.Multer.File[]).map((file: Express.Multer.File) => {
				const dataUri = parser.format(file.originalname, file.buffer);
				return dataUri.content;
			});
		}

		let payload: any = {
			category,
			is_active,
			sequence : Number(sequence)
		};

		if (images) {
			payload = { ...payload, photo: images };
		}

		const updatedCategory = await CategoryModel.findByIdAndUpdate(_id, { $set: payload });

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

		const categories = await CategoryModel.find(filter).sort({ sequence: 1 });
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
