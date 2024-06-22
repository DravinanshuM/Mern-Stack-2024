import createHttpError from "http-errors";
import Contact from "../models/contactSchema.js";

const getAllContact = async (req, res, next) => {
  try {
    const contactData = await Contact.find();
    console.log(contactData);

    res.status(200).json(contactData);
  } catch (error) {
    return next(createHttpError(500, { message: error }));
  }
};

export { getAllContact };
