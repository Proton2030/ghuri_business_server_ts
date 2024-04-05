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

import {v2 as cloudinary} from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dg8myn77o",
  api_key: "666889283813579",
  api_secret: "0N6MGT_3jSRpNKoIr4Wmgg3zxV4"
});

// Function to upload image to Cloudinary
export const uploadImage = async(imagePath:string) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image");
  }
}

// Example usage
// const imagePath = "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg"; // Replace this with the path to your image
// uploadImage(imagePath)
//   .then(url => {
//     console.log("Image uploaded to Cloudinary:", url);
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });