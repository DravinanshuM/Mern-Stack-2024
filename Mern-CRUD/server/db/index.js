import mongoose from "mongoose";
import dotenv from 'dotenv';

// configuration env file.
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL_MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

const connectDB = async () => {
    try {
        const result = await mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`);
        console.log(`Connected Data Base :: ${result.connection.host}`);
    } catch (error) {
       console.log("MongoDB conncetion Failed Error :: ", error.message);
       process.exit(1);
    }
}

export default connectDB;