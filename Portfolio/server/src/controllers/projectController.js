import createHttpError from "http-errors";
import Project from "../models/projectSchema.js";

const getAllProject = async (req, res, next) => {
  try {
    const projectData = await Project.find();
    console.log(projectData);

    res.status(200).json(projectData);
  } catch (error) {
    return next(createHttpError(500, { message: error }));
  }
};

export { getAllProject };
