import express from "express";
import homeRouter from "./routes/homeRouter.js";
import aboutRouter from "./routes/aboutRouter.js";
import contactRouter from "./routes/contactRouter.js";
import experienceRouter from "./routes/experienceRouter.js";
import projectRouter from "./routes/projectRouter.js";

const app = express();

// Here middlewares.
app.use(express.json());

// add here routers.
app.use("/api/introduction/", homeRouter);
app.use("/api/about/", aboutRouter);
app.use("/api/contact/", contactRouter);
app.use("/api/experience/", experienceRouter);
app.use("/api/project/", projectRouter);

export default app;
