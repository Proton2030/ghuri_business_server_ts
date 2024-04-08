import { Request, Response } from "express";
import DatauriParser from "datauri/parser";
import BussinessModel from "../../../../models/bussiness.model";
import { MESSAGE } from "../../../../constants/message";
import axios from "axios";

import NotificationModel from "../../../../models/notification.model";
import getLatLonByCityName from "../../../../services/LatLonFromCityName/getLatLonByCityName";
import { createNotification } from "../../../../services/notification/notification.service";
import RatingModel from "../../../../models/rating.model";
import { TrustProductsChannelEndpointAssignmentListInstance } from "twilio/lib/rest/trusthub/v1/trustProducts/trustProductsChannelEndpointAssignment";
import { FilterQuery } from "mongoose";
import { IBussiness } from "../../../../ts/interfaces/bussiness.interface";
import { CloudinaryUpload } from "../../../../services/uploadFile/UploadFile";

const parser = new DatauriParser();

export const createBusiness = async (req: Request, res: Response) => {
	try {
		const {
			user_object_id,
			name,
			phone_no,
			description,
			address,
			email,
			category,
			pin_code,
			has_acurate_lat_long,
			latitude,
			longitude
		} = req.body;

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

		const latLong = has_acurate_lat_long ? { latitude, longitude } : await getLatLonByCityName(address);

		console.log("lat long", latLong);

		const newBusiness = new BussinessModel({
			user_object_id,
			category: category.toLowerCase(),
			name,
			phone_no,
			description,
			address,
			lat: latLong?.latitude,
			lon: latLong?.longitude,
			email,
			location_2dsphere:{
				type: "Point",
				coordinates:[latLong?.latitude,latLong?.longitude]
			},
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

		const business = await BussinessModel.findOne({_id:id});
		if (business) {
			if (status === "ACTIVE") {
				console.log("====>Active")
				await createNotification(business.user_object_id, `Your Post ${business.name} is approved by Admin`);
			} else if (status === "REJECTED") {
				console.log("====>reject")
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
		const filter: any = req.query;
		const currentPage = parseInt(String(filter.page || "1")); // Parse page as integer

		const limit = 5;

		const startIndex = (currentPage - 1) * limit;

		const sortField = filter.sortField ? filter.sortField : "updatedAt";

		delete filter.page;
		delete filter.sortField

		console.log("===>filter", filter);

		const totalCount = await BussinessModel.countDocuments(filter);

		const businesses = await BussinessModel.find(filter).sort({[sortField]:-1}).populate("user_details").skip(startIndex).limit(limit);

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

export const searchBusiness = async (req: Request, res: Response) => {
	try {
		const { search_item, text } = req.query;

		if (!search_item || !text) {
			return res.status(422).json({
				message: MESSAGE.get.custom("Fields are empyty")
			});
		}

		const query: FilterQuery<IBussiness> = {};
		query[search_item as unknown as string] = { $regex: new RegExp("^" + text, "i") };
		const businesses = await BussinessModel.find(query).populate("user_details").lean();

		res.status(200).json({
			message: MESSAGE.get.succ,
			result: businesses
		});
	} catch (error) {
		console.error("Error fetching businesses:", error);
		res.status(400).json({
			message: MESSAGE.get.fail
		});
	}
};

export const getNearbyBusiness = async (req: Request, res: Response) => {
    try {
        const filter = req.query;
        const { page, limit, lat,lon } = filter;

		const currentPage = parseInt(String(page || "1"));
		const _limit= Number(limit);
		const startIndex = (currentPage - 1) * _limit;
		const lattitude = lat
		const longtitude = lon

		delete filter.page
		delete filter.limit
		delete filter.lon
		delete filter.lat
        
        // Log the received query parameters for debugging
        console.log("Received query parameters:", filter);

		const totalCount = await BussinessModel.countDocuments(filter);

        const response = await BussinessModel.find({...filter, location_2dsphere: {
			$nearSphere: {
			  $geometry: {
				type: "Point",
				coordinates: [longtitude, lattitude] // longitude first, then latitude
			  },
			  $maxDistance: 1000000000 // Example: specify the maximum distance in meters (adjust as needed)
			}
		  }}).populate("user_details").skip(startIndex).limit(_limit);

        // Log the intermediate aggregation result for debugging
        console.log("Intermediate result:", response);

        return res.status(200).json({
            message: MESSAGE.get.succ,
			pagination: {
				total: totalCount,
				currentPage: currentPage
			},
            result: response
        });
    } catch (error) {
        console.error("Error:", error); // Log the caught error for debugging

        return res.status(400).json({
            message: MESSAGE.get.fail,
            error
        });
    }
}

export const updateRatingBusiness = async (req: Request, res: Response) => {
	try {
		const { business_id, rating, user_object_id } = req.body;

		if (!business_id || !rating || !user_object_id) {
			return res.status(422).json({
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

		const existingRating = await RatingModel.findOne({ business_object_id: business_id, user_object_id });
		if (existingRating) {
			await RatingModel.findOneAndUpdate(
				{ business_object_id: business_id, user_object_id },
				{ $set: { rating: newRating } }
			);
		} else {
			await new RatingModel({ business_object_id: business_id, user_object_id, rating: newRating }).save();
		}

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

export const getBusinessRatingDetails = async (req: Request, res: Response) => {
	try {
		const filter = req.query;
		const ratingDetails = await RatingModel.find(filter).populate("user_details").lean();
		return res.status(200).json({
			message: MESSAGE.get.succ,
			result: ratingDetails
		});
	} catch (error) {
		return res.status(400).json({
			message: MESSAGE.get.fail
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
