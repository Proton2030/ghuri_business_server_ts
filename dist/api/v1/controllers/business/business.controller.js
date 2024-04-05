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
exports.getNotification = exports.getBusinessRatingDetails = exports.updateRatingBusiness = exports.searchBusiness = exports.getFilteredBusiness = exports.deleteBusinessById = exports.editBusinessStatusById = exports.getBusiness = exports.editBusinessDetailsById = exports.createBusiness = void 0;
const parser_1 = __importDefault(require("datauri/parser"));
const bussiness_model_1 = __importDefault(require("../../../../models/bussiness.model"));
const message_1 = require("../../../../constants/message");
const notification_model_1 = __importDefault(require("../../../../models/notification.model"));
const getLatLonByCityName_1 = __importDefault(require("../../../../services/LatLonFromCityName/getLatLonByCityName"));
const notification_service_1 = require("../../../../services/notification/notification.service");
const rating_model_1 = __importDefault(require("../../../../models/rating.model"));
const UploadFile_1 = require("../../../../services/uploadFile/UploadFile");
const parser = new parser_1.default();
const createBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_object_id, name, phone_no, description, location, email, category, pin_code, has_acurate_lat_long, latitude, longitude } = req.body;
        if (!req.files || !("images" in req.files)) {
            console.log("files", JSON.stringify(req.files));
            return res.status(404).json({
                message: message_1.MESSAGE.post.custom("Image files not found")
            });
        }
        // Ensure that req.files["images"] is of type Express.Multer.File[]
        if (!Array.isArray(req.files["images"])) {
            return res.status(400).json({
                message: message_1.MESSAGE.post.custom("Invalid image files")
            });
        }
        const images = yield Promise.all(req.files["images"].map((file) => __awaiter(void 0, void 0, void 0, function* () {
            // Convert the uploaded file to Data URI
            const dataUri = parser.format(file.originalname, file.buffer);
            // Upload the image to Cloudinary
            const cloudinaryUrl = yield (0, UploadFile_1.CloudinaryUpload)(dataUri.content);
            return cloudinaryUrl;
        })));
        const latLong = has_acurate_lat_long ? { latitude, longitude } : yield (0, getLatLonByCityName_1.default)(location);
        console.log("lat long", latLong);
        const newBusiness = new bussiness_model_1.default({
            user_object_id,
            category: category.toLowerCase(),
            name,
            phone_no,
            description,
            location,
            lat: latLong === null || latLong === void 0 ? void 0 : latLong.latitude,
            lon: latLong === null || latLong === void 0 ? void 0 : latLong.longitude,
            email,
            photo: images,
            status: "PENDING",
            pin_code
        });
        const savedBusiness = yield newBusiness.save();
        res.status(200).json({
            message: message_1.MESSAGE.post.succ,
            result: savedBusiness
        });
    }
    catch (error) {
        console.error("Error posting business:", error);
        res.status(400).json({
            message: message_1.MESSAGE.post.fail
        });
    }
});
exports.createBusiness = createBusiness;
const editBusinessDetailsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const updatedBusiness = yield bussiness_model_1.default.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!updatedBusiness) {
            return res.status(404).json({
                message: message_1.MESSAGE.post.custom("Business not found")
            });
        }
        res.status(200).json({
            message: message_1.MESSAGE.post.succ,
            result: updatedBusiness
        });
    }
    catch (error) {
        console.error("Error editing business:", error);
        res.status(400).json({
            message: message_1.MESSAGE.post.fail
        });
    }
});
exports.editBusinessDetailsById = editBusinessDetailsById;
const getBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalCount = yield bussiness_model_1.default.countDocuments();
        const businesses = yield bussiness_model_1.default.find().skip(startIndex).limit(limit);
        const results = {
            businesses,
            pagination: {
                total: totalCount,
                currentPage: page
            }
        };
        res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            result: results
        });
    }
    catch (error) {
        console.error("Error fetching businesses:", error);
        res.status(400).json({
            message: message_1.MESSAGE.get.fail
        });
    }
});
exports.getBusiness = getBusiness;
const editBusinessStatusById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, status } = req.body;
        const updatedBusiness = yield bussiness_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        const business = yield bussiness_model_1.default.findById(id);
        if (business) {
            if (status === "ACTIVE") {
                yield (0, notification_service_1.createNotification)(business.user_object_id, `Your Post ${business.name} is approved by Admin`);
            }
            else if (status === "REJECTED") {
                yield (0, notification_service_1.createNotification)(business.user_object_id, `Your Post ${business.name} is rejected by Admin`);
            }
        }
        res.status(200).json({
            message: message_1.MESSAGE.patch.succ,
            result: updatedBusiness
        });
    }
    catch (error) {
        console.error("Error updating business status:", error);
        res.status(400).json({
            message: message_1.MESSAGE.patch.fail
        });
    }
});
exports.editBusinessStatusById = editBusinessStatusById;
const deleteBusinessById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const deletedBusiness = yield bussiness_model_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: message_1.MESSAGE.delete.succ,
            result: deletedBusiness
        });
    }
    catch (error) {
        console.error("Error deleting business:", error);
        res.status(500).json({
            message: message_1.MESSAGE.delete.fail
        });
    }
});
exports.deleteBusinessById = deleteBusinessById;
const getFilteredBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query;
        const currentPage = parseInt(String(filter.page || "1")); // Parse page as integer
        const limit = 5;
        const startIndex = (currentPage - 1) * limit;
        delete filter.page;
        console.log("===>filter", filter);
        const totalCount = yield bussiness_model_1.default.countDocuments(filter);
        const businesses = yield bussiness_model_1.default.find(filter).populate("user_details").skip(startIndex).limit(limit);
        res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            pagination: {
                total: totalCount,
                currentPage: currentPage
            },
            result: businesses
        });
    }
    catch (error) {
        console.error("Error fetching businesses:", error);
        res.status(400).json({
            message: "Failed to retrieve businesses"
        });
    }
});
exports.getFilteredBusiness = getFilteredBusiness;
const searchBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search_item, text } = req.query;
        if (!search_item || !text) {
            return res.status(422).json({
                message: message_1.MESSAGE.get.custom("Fields are empyty")
            });
        }
        const query = {};
        query[search_item] = { $regex: new RegExp("^" + text, "i") };
        const businesses = yield bussiness_model_1.default.find(query).populate("user_details").lean();
        res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            result: businesses
        });
    }
    catch (error) {
        console.error("Error fetching businesses:", error);
        res.status(400).json({
            message: message_1.MESSAGE.get.fail
        });
    }
});
exports.searchBusiness = searchBusiness;
const updateRatingBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { business_id, rating, user_object_id } = req.body;
        if (!business_id || !rating || !user_object_id) {
            return res.status(422).json({
                message: message_1.MESSAGE.patch.fail
            });
        }
        const existingBusiness = yield bussiness_model_1.default.findById(business_id);
        if (!existingBusiness) {
            return res.status(404).json({
                message: message_1.MESSAGE.patch.fail
            });
        }
        const avg_rating = existingBusiness.avg_rate;
        const rating_number = existingBusiness.no_of_rates;
        const newRating = (avg_rating * rating_number + rating) / (rating_number + 1);
        const response = yield bussiness_model_1.default.findByIdAndUpdate(business_id, {
            $set: { avg_rate: newRating },
            $inc: { no_of_rates: 1 }
        });
        const existingRating = yield rating_model_1.default.findOne({ business_object_id: business_id, user_object_id });
        if (existingRating) {
            yield rating_model_1.default.findOneAndUpdate({ business_object_id: business_id, user_object_id }, { $set: { rating: newRating } });
        }
        else {
            yield new rating_model_1.default({ business_object_id: business_id, user_object_id, rating: newRating }).save();
        }
        res.status(200).json({
            message: message_1.MESSAGE.patch.succ,
            result: {}
        });
    }
    catch (error) {
        console.error("Error while posting rating", error);
        res.status(400).json({
            message: message_1.MESSAGE.patch.fail
        });
    }
});
exports.updateRatingBusiness = updateRatingBusiness;
const getBusinessRatingDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query;
        const ratingDetails = yield rating_model_1.default.find(filter).populate("user_details").lean();
        return res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            result: ratingDetails
        });
    }
    catch (error) {
        return res.status(400).json({
            message: message_1.MESSAGE.get.fail
        });
    }
});
exports.getBusinessRatingDetails = getBusinessRatingDetails;
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
const getNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_object_id } = req.query;
        const notificationsList = yield notification_model_1.default.find({ user_object_id: user_object_id }).lean();
        return res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            result: notificationsList
        });
    }
    catch (error) {
        console.log("Error while fetching notification", error);
        res.status(500).json({
            message: "Failed to retrieve notifications"
        });
    }
});
exports.getNotification = getNotification;
