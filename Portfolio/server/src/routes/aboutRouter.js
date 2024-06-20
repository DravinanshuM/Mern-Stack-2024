import express from "express";

import { getAllAbout } from "../controllers/aboutController.js";

const aboutRouter = express.Router();

// router.
aboutRouter.get("/all-data/", getAllAbout);

export default aboutRouter;
