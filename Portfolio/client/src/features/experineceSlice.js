import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  experienceData: null,
};

const experienceSlice = createSlice({
  name: "experienceSlice",
  initialState,
  reducers: {
    setExperienceData: (state, action) => {
      state.experienceData = action.payload;
    },
  },
});

export const { setExperienceData } = experienceSlice.actions;
export default experienceSlice.reducer;
