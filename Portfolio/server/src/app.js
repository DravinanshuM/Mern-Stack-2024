import express from "express";
import cors from "cors";

// routing.
import homeRouter from "./routes/homeRouter.js";
import aboutRouter from "./routes/aboutRouter.js";
import contactRouter from "./routes/contactRouter.js";
import experienceRouter from "./routes/experienceRouter.js";
import projectRouter from "./routes/projectRouter.js";

const app = express();

// Here middlewares.
app.use(express.json()); //his middleware is used to parse incoming requests with JSON payloads. It parses the incoming request body and makes it available under req.body.
app.use(cors()); // If your application needs to handle cross-origin resource sharing (CORS), you can use the cors middleware to enable it for your Express server.

app.use(express.urlencoded({ extended: true })); //It parses the incoming request body if the Content-Type header matches application/x-www-form-urlencoded.
app.use(express.static("../public")); //This middleware is used to serve static files such as images, CSS, JavaScript, etc., from a directory.

// add here routers.
app.use("/api/introduction/", homeRouter);
app.use("/api/about/", aboutRouter);
app.use("/api/contact/", contactRouter);
app.use("/api/experience/", experienceRouter);
app.use("/api/project/", projectRouter);

export default app;
