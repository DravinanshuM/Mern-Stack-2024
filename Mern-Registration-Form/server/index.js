import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// For DataBase conncetion.
import connectionDB from './db/conncetionDB.js';

// Import user Routears.
import user from './routes/users.js';

// Configuration.
dotenv.config();

const app = express();
const port = process.env.PORT || '3000';
const host = "localhost";

// enabled CORS (cross origin for all request)
app.use(cors({
    origin: process.env.CROS_ORIGIN,
    credentials: true,
}));

// Configure express.json middleware to parse JSON requests.
app.use(express.json());

// DataBase Call.
connectionDB();

// use Public folder inside all files and folder.
app.use("/public/uploads",express.static("./public/uploads"));
app.use("/files/export", express.static("./public/files/export"));

// Load Routes, for userAPI.
app.use('/users', user);

app.listen(port, ()=>{
    console.log(`app is running at http://${host}:${port}`);
});
