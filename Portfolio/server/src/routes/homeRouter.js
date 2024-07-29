import express from "express";
// import uploads from "../middlewares/multerConfig.js";

import { getAllIntro, updateAllIntro } from "../controllers/homeController.js";

const homeRouter = express.Router();

// define Home router.
homeRouter.get("/all-data/", getAllIntro);
homeRouter.post("/all-update/:id", updateAllIntro);

export default homeRouter;
