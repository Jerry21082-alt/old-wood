"use client";

import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Nav from "../components/Nav";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import Cart from "./Cart";

export default function Layout({ children }) {
  return (
    <Provider store={store}>
      <Nav />
      <Cart />
      <MobileMenu />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </Provider>
  );
}
