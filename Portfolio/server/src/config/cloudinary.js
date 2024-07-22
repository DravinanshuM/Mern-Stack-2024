import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config.js";

// 1. cloudinary configuration.
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  secret_key: config.cloudinary_secret_key,
});

// 2. export cloudinary.
export default cloudinary;
