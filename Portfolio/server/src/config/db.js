import mongoose from "mongoose";
import { config } from "./config.js";

// console.log("This is a Conncetion URL :: ",config.mongodb_connection_url);

const connectionDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log("Database Connected Successfully.");
    });

    mongoose.connection.on('error', (error) => {
      console.error("Database Connection Error: ", error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log("Database Disconnected.");
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Database connection closed due to app termination');
      process.exit(0);
    });

    await mongoose.connect(config.mongodb_connection_url);

  } catch (error) {
    console.error("Error connecting to the database: ", error);
    process.exit(1); // Exit the process with a failure
  }
};

export default connectionDB;
