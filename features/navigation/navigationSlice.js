import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
  isCartOpen: false,
  closeCart: false,
  revealOverlay: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.revealOverlay = !state.revealOverlay;
      state.isMenuOpen = !state.isMenuOpen;
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.revealOverlay = !state.revealOverlay;
      state.isCartOpen = !state.isCartOpen;
      state.isMenuOpen = false;
    },
    closeAll: (state) => {
      state.revealOverlay = !state.revealOverlay;

      if (state.isCartOpen || state.isMenuOpen) {
        state.isCartOpen = false;
        state.isMenuOpen = false;
      }
    },
    toggleOverlay: (state) => {
      state.revealOverlay = !state.revealOverlay;
    },
  },
});

export const { toggleMenu, toggleCart, isCartOpen, closeAll, toggleOverlay } =
  navigationSlice.actions;
export default navigationSlice.reducer;
