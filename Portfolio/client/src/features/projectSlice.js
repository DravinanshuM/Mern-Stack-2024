import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectData: null,
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    setProjectData: (state, action) => {
      state.projectData = action.payload;
    },
  },
});

export const { setProjectData } = projectSlice.actions;
export default projectSlice.reducer;
