import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qty: 1,
  agree: false,
};

const changeQty = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    increaseQty: (state) => {
      state.qty += 1;
    },
    decreaseQty: (state) => {
      if (state.qty - 1 < 1) {
        state.qty = 1;
      } else {
        state.qty -= 1;
      }
    },
    toggleAgree: (state) => {
      state.agree = !state.agree;
    },
  },
});

export const { decreaseQty, increaseQty, toggleAgree } = changeQty.actions;
export default changeQty.reducer;
