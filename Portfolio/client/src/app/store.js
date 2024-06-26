import { configureStore } from "@reduxjs/toolkit";
import introSlice from "../features/introSlice";

export const store = configureStore({
  reducer: {
    intro: introSlice,
  },
});
