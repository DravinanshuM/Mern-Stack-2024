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

const updateAllIntro = async (req, res, next) => {
  console.log(req.body); // Log the incoming request body for debugging

  try {
    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true } // Return the updated document
    );

    if (!intro) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Intro not found.",
      });
    }

    res.status(200).json({
      status: 200,
      introData: intro,
      success: true,
      message: "Intro updated successfully.",
    });
  } catch (error) {
    console.error("Error updating intro:", error);
    return next(createHttpError(500, { message: "Error updating intro." }));
  }
};

export { getAllIntro, updateAllIntro };
