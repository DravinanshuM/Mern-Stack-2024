import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  mongodb_connection_url: process.env.MONGODB_CONNECTION_STRING,
  env: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
