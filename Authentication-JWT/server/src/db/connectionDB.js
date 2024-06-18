import mongoose from 'mongoose';
import { config } from '../config/config.js';

const DATABASE_URL = config.DataBaseUrl;
const DATABASE_NAME = config.DataBaseName;

const connectionDB = async () => {
   try {
      await mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`);
      console.log("DataBase Connected");
   } catch (error) {
     console.error("Database connection failed:", error);
     process.exit(1); // Exit the process if database connection fails.
   }
}

export default connectionDB;
