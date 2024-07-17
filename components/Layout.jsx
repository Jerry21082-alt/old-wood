"use client";

import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Nav from "../components/Nav";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import Cart from "./Cart";
import Overlay from "./Overlay";

export default function Layout({ children }) {
  return (
    <Provider store={store}>
      <Nav />
      <Cart />
      <MobileMenu />
      <Overlay />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </Provider>
  );
}
