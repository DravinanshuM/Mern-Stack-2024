import mongoose from "mongoose";
import validator from "validator";

const introSchema = new mongoose.Schema(
  {
    welcomeText: {
      type: String,
      required: [true, "Welcome text is required"],
    },

    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minLength: [4, "First name must be at least 4 characters long"],
      maxLength: [20, "First name cannot exceed 20 characters"],
      validate: [
        {
          validator: function (value) {
            return value.split(" ").langth === 1;
          },
          message: "First name should be a single word without spaces",
        },
        {
          validator: function (value) {
            return validator.isAlpha(value);
          },
          message: "First name should contain only alphabetic characters",
        },
      ],
      set: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      },
    },

    lastName: {
      type: String,
      required: [true, "lastName is required."],
      minLength: [4, "Last name must be at least 4 characters long"],
      maxLenght: [20, "Last name cannot exceed 20 characters"],
      validate: {
        validator: function (value) {
          return validator.isAlpha(value);
        },
        message: "Last name should contain only alphabetic characters",
      },
      set: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      },
    },

    caption: {
      type: String,
      required: [true, "Caption is required"],
      minLength: [20, "Caption must be at least 20 characters"],
      maxLength: [100, "Caption cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [50, "Caption must be at least 50 characters"],
      maxLength: [500, "Caption cannot exceed 500 characters"],
    },

    ProfileImage: {
      type: String,
      required: [true, "Profile Image is required"],
    },
  },
  { timestamps: true }
);

const Intro = mongoose.model("Intro", introSchema);

export default Intro;
