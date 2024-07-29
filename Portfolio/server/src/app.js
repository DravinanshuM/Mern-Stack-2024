import express from "express";
import cors from "cors";

// Import routes
import homeRouter from "./routes/homeRouter.js";
import aboutRouter from "./routes/aboutRouter.js";
import contactRouter from "./routes/contactRouter.js";
import experienceRouter from "./routes/experienceRouter.js";
import projectRouter from "./routes/projectRouter.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

const app = express();

// Middleware setup
app.use(express.json()); // Parses JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded payloads
app.use(cors()); // Enable CORS

// Route setup
app.use("/api/introduction/", homeRouter);
app.use("/api/about/", aboutRouter);
app.use("/api/contact/", contactRouter);
app.use("/api/experience/", experienceRouter);
app.use("/api/project/", projectRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
