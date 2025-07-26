import { v2 as cloudinary } from "cloudinary";
import AppError from "../errorHelpers/AppError";
import { envVars } from "./env";

cloudinary.config({
  cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY_API_SECRET,
});

export const deleteImgCloudinary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
    const match = url.match(regex);
    if (match && match[1]) {
      const public_id = match[1];
      await cloudinary.uploader.destroy(public_id);
      console.log(`File ${public_id} is deleted`);
    }
  } catch (error) {
    console.log(error);
    throw new AppError(401, "Cloudinary image deletion error occurred");
  }
};

export const cloudinaryUpload = cloudinary;
