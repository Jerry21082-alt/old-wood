import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "../features/navigation/navigationSlice";
import changeQty from "../features/checkout/checkoutSlice";
import cartItems from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    checkout: changeQty,
    cart: cartItems,
  },
});
