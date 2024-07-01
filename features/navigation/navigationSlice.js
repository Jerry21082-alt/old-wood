import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggleMenu } = navigationSlice.actions;
export default navigationSlice.reducer;
