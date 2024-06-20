import express from "express";

import { getAllContact } from "../controllers/contectController.js";

const contactRouter = express.Router();

// router.
contactRouter.get("/all-data/", getAllContact);

export default contactRouter;
