import createHttpError from "http-errors";
import About from "../models/aboutModel.js";

const getAllAbout = async (req, res, next) => {
  try {
    const aboutData = await About.find();
    console.log(aboutData);

    res.status(200).json(aboutData);
  } catch (error) {
    return next(createHttpError(500, { message: error }));
  }
};

export { getAllAbout };
