import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
  isCartOpen: false,
  closeCart: false,
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
    closeCart: (state) => {
      state.closeCart = true;
    },
  },
});

export const { toggleMenu, toggleCart, isCartOpen, closeCart } =
  navigationSlice.actions;
export default navigationSlice.reducer;
