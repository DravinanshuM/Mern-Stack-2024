import mongoose from "mongoose";

const experinceSchema = new mongoose.Schema(
  {
    period: {
      type: String,
      required: [true, "Period is required"],
    },

    coverImage: {
      type: String,
      required: [true, "Cover image is required"],
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [100, "Designation Title cannot exceed 100 characters."],
    },

    compnay: {
      type: String,
      required: [true, "Compnay name is required"],
      maxLength: [100, "Compnay name cannot exceed 100 characters."],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [50, "Caption must be at least 50 characters"],
      maxLength: [500, "Caption cannot exceed 500 characters"],
    },

    compnay_url: {
      type: String,
      required: [true, "Compnay Url is required"],
    },
  },
  { timestamps: true }
);

const Experinece = mongoose.model("Experience", experinceSchema);

export default Experinece;
