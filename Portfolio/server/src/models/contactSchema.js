import mongoose from "mongoose";
import validator from "validator";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [4, "Name must be at least 4 characters."],
      maxLenght: [50, "Name cannot exceed 50 characters."],
      validate: {
        validator: function (value) {
          return validator.isAlpha(value);
        },
        message: "Name should contains only alphabetic characters",
      },

      set: function (value) {
        return value
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },

    designation: {
      type: String,
      required: [true, "Designation is required"],
      minLength: [4, "Designation at least 4 characters"],
      maxLenght: [50, "Designation cannot exceed 50 characters"],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
    },

    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      minLength: [10, "Mobile number at least 10 digits"],
      maxLenght: [15, "mobile number at least 15 digits"],
    },

    address: {
      type: String,
      required: [true, "Address is required true"],
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
