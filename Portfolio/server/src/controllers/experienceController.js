import createHttpError from "http-errors";
import Experience from "../models/experinceModel.js";

const getAllExperinece = async (req, res, next) => {
  try {
    const experienceData = await Experience.find();
    console.log(experienceData);

    res.status(200).json(experienceData);
  } catch (error) {
    return next(createHttpError(500, { message: error }));
  }
};

export { getAllExperinece };
