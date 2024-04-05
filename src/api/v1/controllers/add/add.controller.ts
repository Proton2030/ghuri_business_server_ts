import { Request, Response } from "express";
import AddModel from "../../../../models/add.model";
import { MESSAGE } from "../../../../constants/message";
import DatauriParser from "datauri/parser";
import { CloudinaryUpload } from "../../../../services/uploadFile/UploadFile";

const parser = new DatauriParser();

export const createAdvertisement = async (req: Request, res: Response) => {
	try {
		const { target_url, active } = req.body;
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
		const newAdvertisement = new AddModel({
			photo: images,
			target_url: target_url,
			active: active
		});

		const response = await newAdvertisement.save();

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

export const deleteAdvertisement = async (req: Request, res: Response) => {
	try {
		const _id = req.params;
		const deletedAd = await AddModel.findByIdAndDelete(_id);

		if (!deletedAd) {
			return res.status(404).json({
				message: MESSAGE.delete.fail
			});
		}

		return res.status(200).json({
			message: MESSAGE.delete.succ,
			result: deletedAd
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			message: MESSAGE.delete.fail,
			error: error
		});
	}
};

export const editAdvertisement = async (req: Request, res: Response) => {
	try {
		const adId = req.params.id;
		const { image_url, target_url, active } = req.body;
		const updatedAd = await AddModel.findByIdAndUpdate(
			adId,
			{
				image_url: image_url,
				target_url: target_url,
				active: active
			},
			{ new: true }
		);

		if (!updatedAd) {
			return res.status(404).json({
				message: MESSAGE.patch.fail
			});
		}

		return res.status(200).json({
			message: MESSAGE.patch.succ,
			result: updatedAd
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			message: MESSAGE.patch.fail,
			error: error
		});
	}
};

export const getAdvertisements = async (req: Request, res: Response) => {
	try {
		const advertisements = await AddModel.find();
		return res.status(200).json({
			message: MESSAGE.get.succ,
			result: advertisements
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			message: MESSAGE.get.fail,
			error: error
		});
	}
};
