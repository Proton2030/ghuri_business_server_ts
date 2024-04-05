// const cloudinary = require("cloudinary");

// cloudinary.v2.config({
// cloud_name: "dg8myn77o",
// api_key: "666889283813579",
// api_secret: "0N6MGT_3jSRpNKoIr4Wmgg3zxV4",
//   secure: true,
// });

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function(error, result) {console.log(result); });
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
	cloud_name: "dg8myn77o",
	api_key: "666889283813579",
	api_secret: "0N6MGT_3jSRpNKoIr4Wmgg3zxV4"
});

// Function to upload image to Cloudinary

export const CloudinaryUpload = async (imagePath: string) => {
	console.log("<=====cloudinary api called=====>");
	try {
		// Upload image to Cloudinary
		const result = await cloudinary.uploader.upload(imagePath);
		console.log("------>result", result.url);
		return result.url;
	} catch (error) {
		console.error("Error uploading image:", error);
		throw new Error("Error uploading image");
	}
};
