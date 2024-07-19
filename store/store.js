import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "../features/navigation/navigationSlice";
import changeQty from "../features/checkout/checkoutSlice";
import cartItems from "../features/cart/cartSlice";
import showMeReducer from "../features/overlay/overlaySlice";
import { load, save } from "redux-localstorage-simple";

const PERSISTED_KEYS = ["cart"];

let preloadedState;
try {
  preloadedState = load({ states: PERSISTED_KEYS });
} catch (error) {
  console.warn("Invalid state in localStorage, resetting state.");
  preloadedState = {};
}

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    checkout: changeQty,
    cart: cartItems,
    overlay: showMeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(save({ states: PERSISTED_KEYS })),
  preloadedState,
});
