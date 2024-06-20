import express from "express";

import { getAllIntro } from "../controllers/homeController.js";

const homeRouter = express.Router();

// define Home router.
homeRouter.get("/all-data/", getAllIntro);

export default homeRouter;
