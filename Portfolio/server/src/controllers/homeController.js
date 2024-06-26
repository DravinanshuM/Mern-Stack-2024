import createHttpError from "http-errors";
import Intro from "../models/homeModel.js";

const getAllIntro = async (req, res, next) => {
  try {
    const introData = await Intro.find();
    console.log("data", introData);

    res.status(200).json({ status: 200, introData: introData });
  } catch (error) {
    return next(createHttpError(500, { message: error }));
  }
};

export { getAllIntro };
