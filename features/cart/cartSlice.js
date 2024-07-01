import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      state.cartItems.push(payload);
    },
    removeFromCart: (state, action) => {
      const payload = action.payload;
      state.cartItems = state.cartItems.slice(
        1,
        state.cartItems.indexOf(payload)
      );
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
