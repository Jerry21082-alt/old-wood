import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
  isCartOpen: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
      state.isMenuOpen = false;
    },
  },
});

export const { toggleMenu, toggleCart, isCartOpen } = navigationSlice.actions;
export default navigationSlice.reducer;
