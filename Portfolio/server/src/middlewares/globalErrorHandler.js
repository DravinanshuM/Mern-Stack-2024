import { config } from "../config/config.js";

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const errorResponse = {
    message: err.message,
  };

  // Include stack trace in error response only in development
  if (config.env === "development") {
    errorResponse.errorStack = err.stack;
  }

  return res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
