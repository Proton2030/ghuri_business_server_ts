import { Request, Response } from "express";
import DatauriParser from "datauri/parser";
import BussinessModel from "../../../../models/bussiness.model";
import { MESSAGE } from "../../../../constants/message";

const parser = new DatauriParser();

export const createBusiness = async (req: Request, res: Response) => {
	try {
		const { user_object_id, name, phone_no, description, location, email, category } = req.body;

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

		const newBusiness = new BussinessModel({
			user_object_id,
			category,
			name,
			phone_no,
			description,
			location,
			email,
			photo: images,
			status: "PENDING"
		});

		const savedBusiness = await newBusiness.save();

		res.status(200).json({
			message: MESSAGE.post.succ,
			result: savedBusiness
		});
	} catch (error) {
		console.error("Error posting business:", error);
		res.status(400).json({
			message: MESSAGE.post.fail
		});
	}
};

export const editBusinessDetailsById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { user_object_id, name, phone_no, description, location, email, category } = req.body;

		const updatedFields = {
			user_object_id,
			name,
			phone_no,
			description,
			location,
			email,
			category
		};

		const updatedBusiness = await BussinessModel.findByIdAndUpdate(id, updatedFields, { new: true });

		if (!updatedBusiness) {
			return res.status(404).json({
				message: MESSAGE.post.custom("Business not found")
			});
		}

		res.status(200).json({
			message: MESSAGE.post.succ,
			result: updatedBusiness
		});
	} catch (error) {
		console.error("Error editing business:", error);
		res.status(400).json({
			message: MESSAGE.post.fail
		});
	}
};

export const getBusiness = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 5;

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const totalCount = await BussinessModel.countDocuments().exec();

		const businesses = await BussinessModel.find().skip(startIndex).limit(limit).populate("user_details").exec();

		const results = {
			businesses,
			pagination: {
				total: totalCount,
				currentPage: page
			}
		};

		res.status(200).json({
			message: MESSAGE.get.succ,
			result: results
		});
	} catch (error) {
		console.error("Error fetching businesses:", error);
		res.status(400).json({
			message: MESSAGE.get.fail
		});
	}
};

export const editBusinessStatusById = async (req: Request, res: Response) => {
	try {
		const { id, status } = req.body;

		const updatedBusiness = await BussinessModel.findByIdAndUpdate(id, { status }, { new: true });

		res.status(200).json({
			message: MESSAGE.patch.succ,
			result: updatedBusiness
		});
	} catch (error) {
		console.error("Error updating business status:", error);
		res.status(400).json({
			message: MESSAGE.patch.fail
		});
	}
};

export const deleteBusinessById = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;

		const deletedBusiness = await BussinessModel.findByIdAndDelete(id);

		res.status(200).json({
			message: MESSAGE.delete.succ,
			result: deletedBusiness
		});
	} catch (error) {
		console.error("Error deleting business:", error);
		res.status(500).json({
			message: MESSAGE.delete.fail
		});
	}
};

export const getFilteredBusiness = async (req: Request, res: Response) => {
	try {
		let { page = "1", ...filter } = { ...req.query };
		const currentPage = parseInt(page as string); // Parse page as integer

		const limit = 5;

		const startIndex = (currentPage - 1) * limit;
		const endIndex = currentPage * limit;

		const totalCount = await BussinessModel.countDocuments(filter);

		const businesses = await BussinessModel.find(filter).skip(startIndex).limit(limit);

		res.status(200).json({
			message: MESSAGE.get.succ,
			pagination: {
				total: totalCount,
				currentPage: currentPage
			},
			result: businesses
		});
	} catch (error) {
		console.error("Error fetching businesses:", error);
		res.status(400).json({
			message: "Failed to retrieve businesses"
		});
	}
};
