const cloudinary = require("cloudinary").v2;// Configure Cloudinary
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