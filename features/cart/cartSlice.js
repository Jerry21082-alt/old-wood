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
    updateItem: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) existingItem.quantity = quantity - 1 < 1 ? 1 : quantity;
    },
  },
});

export const { addToCart, updateItem } = cartSlice.actions;
export default cartSlice.reducer;
