import express from "express";

import { getAllExperinece } from "../controllers/experienceController.js";
const experienceRouter = express.Router();

// router.
experienceRouter.get("/all-data/", getAllExperinece);

export default experienceRouter;
