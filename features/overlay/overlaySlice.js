import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMe: false,
};

const overlaySlice = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    toggleShowMe: (state) => {
      state.showMe = !state.showMe;
    },
  },
});

export const { toggleShowMe } = overlaySlice.actions;
export default overlaySlice.reducer;
