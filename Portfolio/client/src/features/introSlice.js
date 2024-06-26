import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  introData: null,
};

const introSlice = createSlice({
  name: "introSlice",
  initialState,
  reducers: {
    setIntroData: (state, action) => {
      state.introData = action.payload;
    },
  },
});

export const { setIntroData } = introSlice.actions;
export default introSlice.reducer;
