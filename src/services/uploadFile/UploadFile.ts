import AWS from "aws-sdk";

// Configure DigitalOcean Spaces (using AWS SDK)
const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint("https://gurigharangna.blr1.digitaloceanspaces.com"), // DigitalOcean Spaces endpoint (region-specific)
  accessKeyId: process.env.REACT_APP_DO_SPACES_KEY||"DO00W839CX4RVUNUKLZD",  // Your Access Key from .env
  secretAccessKey: process.env.REACT_APP_DO_SPACES_SECRET||"mDjp2E9cZP99oN5mlo4mHAcBRjrg2RHX/X7cB/42oHM",  // Your Secret Key from .env
});

// Function to upload image to DigitalOcean Spaces
export const SpaceUpload = async (imagePath: string) => {
  console.log("<=====DigitalOcean Spaces API called=====>");

  const fileName = `uploads/${Date.now()}_${imagePath.split("/").pop()}`; // Construct file name with a timestamp

  // Set the upload parameters
  const params = {
    Bucket: "gurigharangna", // Your Space name
    Key: fileName, // The name of the file to be saved in the bucket
    Body: Buffer.from(imagePath.replace(/^data:image\/\w+;base64,/, ""), "base64"), // Remove the data URI scheme and decode the base64 string
    ContentEncoding: "base64", // Specify that the content is base64 encoded
    ACL: "public-read", // Make the file publicly accessible
    ContentType: "image/jpeg", // Adjust MIME type according to the image type (optional)
  };

  try {
    // Upload the file to DigitalOcean Spaces
    const result = await s3.upload(params).promise();
    console.log("------>result", result.Location);
    return result.Location; // The URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image");
  }
};
