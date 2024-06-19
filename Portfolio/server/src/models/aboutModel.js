import mongoose from "mongoose";
import validator from "validator";

const aboutSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [100, "Caption must be at least 100 characters"],
      maxLength: [700, "Caption cannot exceed 700 characters"],
    },

    profileImage: {
      type: String,
      required: [true, "Profile image is required"],
    },

    skills: {
      type: Array,
      required: [true, "Skills are required"],
    },
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);

export default About;
