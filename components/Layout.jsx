"use client";

import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Nav from "../components/Nav";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import SearchBar from "./SearchBar";

export default function Layout({ children }) {
  const isOpened = useSelector((state) => state.navigation.isCartOpen);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  return (
    <section className="min-h-screen flex flex-col relative">
      <Nav />
      <Cart />
      <SearchBar />
      {/* <MobileMenu /> */}
      <main>{children}</main>
      <Footer />
    </section>
  );
}
