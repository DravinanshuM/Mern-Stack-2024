import express from "express";

import { getAllIntro, updateAllIntro } from "../controllers/homeController.js";

const homeRouter = express.Router();

// define Home router.
homeRouter.get("/all-data/", getAllIntro);
homeRouter.post("/all-update/", updateAllIntro);

export default homeRouter;
