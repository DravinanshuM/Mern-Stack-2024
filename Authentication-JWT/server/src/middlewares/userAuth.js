import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';
import { config } from '../config/config.js';
import createHttpError from 'http-errors';

const secretKey = config.SecretKey;

const userAuth = async (req, res, next) => {

    try {
        const token = req.headers.authorization;

        // console.log("middleware auth token", req.headers.authorization);


        // If token is missing
        if (!token) {
            return next(createHttpError(400, "Authorization token missing"));
        }

        // Verify token
        const verifyToken = jwt.verify(token, secretKey);

        // If token is invalid or expired
        if (!verifyToken) {
            return next(createHttpError(401, "Invalid or expired token"));
        }

        // Find user in the database based on token
        const userRoot = await userModel.findOne({ _id: verifyToken._id });

        // If user is not found
        if (!userRoot) {
            return next(createHttpError(401, "User not found"));
        }

        // console.log(userRoot);

        // Attach token, userRoot, and userId to request object
        req.token = token;
        req.userRoot = userRoot;
        req.userId = userRoot._id;

        // Call next middleware
        next();
    } catch (error) {
        // Handle any unexpected errors
        console.error("Error in userAuth middleware:", error);
        return next(createHttpError(500, "Internal server error"));
    }
};


export default userAuth