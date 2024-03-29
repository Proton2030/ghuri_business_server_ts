import { Request, Response } from "express";
import DatauriParser from "datauri/parser";
import BussinessModel from "../../../../models/bussiness.model";
import { MESSAGE } from "../../../../constants/message";
import axios from "axios";

import NotificationModel from "../../../../models/notification.model";
import getLatLonByCityName from "../../../../services/LatLonFromCityName/getLatLonByCityName";
import { createNotification } from "../../../../services/notification/notification.service";

const parser = new DatauriParser();

export const createBusiness = async (req: Request, res: Response) => {
	try {
		const { user_object_id, name, phone_no, description, location, email, category, pin_code } = req.body;

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

		const latLong = await getLatLonByCityName(location);

		console.log("lat long", latLong);

		const newBusiness = new BussinessModel({
			user_object_id,
			category,
			name,
			phone_no,
			description,
			location,
			lat: latLong?.latitude,
			lon: latLong?.longitude,
			email,
			photo: images,
			status: "PENDING",
			pin_code
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
		const { user_object_id, name, phone_no, description, location, email, category, pin_code, lat } = req.body;

		const updatedFields = {
			user_object_id,
			name,
			phone_no,
			description,
			location,
			email,
			category,
			pin_code
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

		const totalCount = await BussinessModel.countDocuments();

		const businesses = await BussinessModel.find().skip(startIndex).limit(limit);

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

		const business = await BussinessModel.findById(id);
		if (business) {
			if (status === "ACTIVE") {
				await createNotification(business.user_object_id, `Your Post ${business.name} is approved by Admin`);
			} else if (status === "REJECTED") {
				await createNotification(business.user_object_id, `Your Post ${business.name} is rejected by Admin`);
			}
		}

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
		const { page = "1", filter } = req.query;
		const currentPage = parseInt(page as string); // Parse page as integer

		const limit = 5;

		const startIndex = (currentPage - 1) * limit;
		const endIndex = currentPage * limit;

		const totalCount = await BussinessModel.countDocuments({ filter });

		const businesses = await BussinessModel.find({ filter }).skip(startIndex).limit(limit);

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

export const updateRatingBusiness = async (req: Request, res: Response) => {
	try {
		const { business_id, rating } = req.body;

		if (!business_id || !rating) {
			return res.status(400).json({
				message: MESSAGE.patch.fail
			});
		}

		const existingBusiness = await BussinessModel.findById(business_id);
		if (!existingBusiness) {
			return res.status(404).json({
				message: MESSAGE.patch.fail
			});
		}

		const avg_rating = existingBusiness.avg_rate;
		const rating_number = existingBusiness.no_of_rates;

		const newRating = (avg_rating * rating_number + rating) / (rating_number + 1);

		const response = await BussinessModel.findByIdAndUpdate(business_id, {
			$set: { avg_rate: newRating },
			$inc: { no_of_rates: 1 }
		});

		res.status(200).json({
			message: MESSAGE.patch.succ,
			result: {}
		});
	} catch (error) {
		console.error("Error while posting rating", error);
		res.status(400).json({
			message: MESSAGE.patch.fail
		});
	}
};

// export const pincodeToLatLon = async (req: Request, res: Response) => {
// 	try {
// 		const { pin_code } = req.query;
// 		const userApiUrl = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pin_code}`;

// 		const userResponse = await axios.get(userApiUrl);

// 		if (userResponse.data.length === 0) {
// 			return res.json({
// 				message: MESSAGE.get.fail
// 			});
// 		}

// 		const userLatitude = parseFloat(userResponse.data[0].lat);
// 		const userLongitude = parseFloat(userResponse.data[0].lon);

// 		const latlonDatabase = await BussinessModel.find({}, "lat lon name description location category photo").select(
// 			"photo"
// 		);

// 		const locationsWithDistances = latlonDatabase.map((location) => {
// 			const distance = getDistanceByLatLon(userLatitude, userLongitude, location.lat, location.lon);
// 			return { ...location.toObject(), distance };
// 		});

// 		const sortedLocations = locationsWithDistances.sort((a, b) => a.distance - b.distance);

// 		res.status(200).json({
// 			message: MESSAGE.get.succ,
// 			result: sortedLocations
// 		});
// 	} catch (error) {
// 		console.log("Error while posting latlon", error);
// 		res.status(400).json({
// 			message: MESSAGE.get.fail
// 		});
// 	}
// };

export const getNotification = async (req: Request, res: Response) => {
	try {
		const { user_object_id } = req.query;

		const notificationsList = await NotificationModel.find({ user_object_id: user_object_id }).lean();

		return res.status(200).json({
			message: MESSAGE.get.succ,
			result: notificationsList
		});
	} catch (error) {
		console.log("Error while fetching notification", error);
		res.status(500).json({
			message: "Failed to retrieve notifications"
		});
	}
};
