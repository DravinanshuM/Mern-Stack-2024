import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  mongodb_connection_url: process.env.MONGODB_CONNECTION_STRING,
  env: process.env.NODE_ENV,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret_key: process.env.CLOUDINARY_SECRET_KEY,
};

export const config = Object.freeze(_config);
