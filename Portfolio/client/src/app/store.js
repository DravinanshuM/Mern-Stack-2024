import { configureStore } from "@reduxjs/toolkit";
import introSlice from "../features/introSlice.js";
import aboutSlice from "../features/aboutSlice.js";
import contactSlice from "../features/contectSlice.js";
import experienceSlice from "../features/experineceSlice.js";
import projectSlice from "../features/projectSlice.js";

export const store = configureStore({
  reducer: {
    intro: introSlice,
    about: aboutSlice,
    contact: contactSlice,
    experience: experienceSlice,
    project: projectSlice,
  },
});
