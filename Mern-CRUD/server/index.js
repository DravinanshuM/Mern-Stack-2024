import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

// Import Database Connection.
import connectDB from './db/index.js';

// Import user router.
import userRouter from './routers/user.js';

// Configure environment variables.
dotenv.config();

const app = express();
const port = process.env.PORT || '8000';

// enabled CORS (cross origin for all request)
app.use(cors());

// Configure express.json middleware to parse JSON requests.
// app.use(express.json());
    // OR
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Establish a connection to the database.
connectDB();

// Load user router.
app.use('/api', userRouter);

// Start the server.
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
