import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartLength: 1,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, product } = action.payload;

      const itemExistInCart = state.cartItems.some((item) => item === product);

      if (itemExistInCart) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
        state.cartLength = state.cartItems.length;
      } else {
        state.cartItems.push(payload);
        state.cartLength = state.cartItems.length;
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      state.cartLength = state.cartItems.length;
    },
    updateItem: (state, action) => {
      const { quantity, product } = action.payload;
      const existingItem = state.cartItems.some((item) => item === product);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
      state.cartLength = state.cartItems.length;
    },
  },
});

export const { addToCart, updateItem, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
