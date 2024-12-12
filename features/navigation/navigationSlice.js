import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  closeCart: false,
  revealOverlay: false,
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
      state.revealOverlay =
        state.isSearchOpen || state.isMenuOpen ? true : !state.revealOverlay;
      state.isCartOpen = !state.isCartOpen;
      state.isMenuOpen = false;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
      state.revealOverlay = state.isSearchOpen ? true : false;
      state.isMenuOpen = false;
    },
    closeAll: (state) => {
      state.revealOverlay = false;

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

export const {
  toggleMenu,
  toggleCart,
  isCartOpen,
  closeAll,
  toggleOverlay,
  toggleSearch,
} = navigationSlice.actions;
export default navigationSlice.reducer;
