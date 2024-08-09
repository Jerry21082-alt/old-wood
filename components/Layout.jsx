"use client";

import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Nav from "../components/Nav";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import Cart from "./Cart";
import Overlay from "./Overlay";
import SearchBar from "./SearchBar";

export default function Layout({ children }) {
  return (
    <Provider store={store}>
      <section className="min-h-screen flex flex-col relative">
        <Nav />
        <Cart />
        <SearchBar />
        <MobileMenu />
        <Overlay />
        <main>{children}</main>
        <Footer />
      </section>
    </Provider>
  );
}
