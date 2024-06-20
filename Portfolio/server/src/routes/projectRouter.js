import express from "express";

import { getAllProject } from "../controllers/projectController.js";

const projectRouter = express.Router();

// Router.
projectRouter.get("/all-data/", getAllProject);

export default projectRouter;
