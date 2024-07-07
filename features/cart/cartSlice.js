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

      const itemExistInCart = state.cartItems.find(
        (item) => item.id === payload.id
      );

      if (itemExistInCart) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                price: item.price + item.price,
              }
            : item
        );
      } else state.cartItems.push(payload);
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    updateItem: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addToCart, updateItem, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
