import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "../features/navigation/navigationSlice";
import changeQty from "../features/checkout/checkoutSlice";
import cartItems from "../features/cart/cartSlice";
import allProduct from "../features/allProducts/productSlice";
import auth from "../features/authentication/authSlice";
import { load, save } from "redux-localstorage-simple";

const PERSISTED_KEYS = ["cart", "products"];

let preloadedState;

try {
  preloadedState = load({ states: PERSISTED_KEYS });
  console.log("Preloaded State:", preloadedState);
} catch (error) {
  console.warn("Invalid state in localStorage, resetting state:", error);
  preloadedState = {};
}

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    checkout: changeQty,
    cart: cartItems,
    products: allProduct,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(save({ states: PERSISTED_KEYS })),
  preloadedState,
});
