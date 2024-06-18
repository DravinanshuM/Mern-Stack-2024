import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/config.js';
import connectionDB from './db/connectionDB.js';
import userRouter from './routes/userRoutes.js';
import globalErrorHandler from './middlewares/globalErrorhandler.js';

// Call Database Connection.
connectionDB();

const app = express();
const port = config.Port || 7000;

// Enable CORS (cross-origin requests) for all routes
app.use(cors({
    // origin: config.CrossOrigin,
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Cookie-parser.
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

// Load user routes
app.use('/api/users', userRouter);

// Global error handler middleware
app.use(globalErrorHandler);

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
