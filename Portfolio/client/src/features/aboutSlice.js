import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aboutData: null,
};

const aboutSlice = createSlice({
  name: "aboutSlice",
  initialState,
  reducers: {
    setAboutData: (state, action) => {
      state.aboutData = action.payload;
    },
  },
});

export const { setAboutData } = aboutSlice.actions;
export default aboutSlice.reducer;
