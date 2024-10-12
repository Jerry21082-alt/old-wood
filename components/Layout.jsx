"use client";

import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Nav from "../components/Nav";

import { Provider, useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import Overlay from "./Overlay";
import SearchBar from "./SearchBar";

export default function Layout({ children }) {
  const isOpened = useSelector((state) => state.navigation.isCartOpen);
  return (
    <section
      className="min-h-screen flex flex-col relative"
      style={{ position: isOpened ? "fixed" : "revert" }}
    >
      <Nav />
      <Cart />
      <SearchBar />
      <MobileMenu />
      <Overlay />
      <main>{children}</main>
      <Footer />
    </section>
  );
}
