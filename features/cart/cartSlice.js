import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartLength: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;

      const itemExistInCart = state.cartItems.find(
        (item) => item._id === payload._id
      );

      if (itemExistInCart) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === payload._id
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
      const { _id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== _id);
      state.cartLength = state.cartItems.length;
    },
    updateItem: (state, action) => {
      const { _id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
      state.cartLength = state.cartItems.length;
    },
  },
});

export const { addToCart, updateItem, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
