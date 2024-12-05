"use client";

import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Nav from "../components/Nav";
import Cart from "./Cart";
import SearchBar from "./SearchBar";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/authentication/authSlice";
import { getUserFromToken } from "@/utils/getUserFromToken";
import MobileNavigation from "./MobileNavigation";

export default function Layout({ children }) {
  const isOpened = useSelector((state) => state.navigation.isCartOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      const user = getUserFromToken(token);
      console.log(user);
      if (user) dispatch(login(user));
    }
  }, []);

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
      <MobileNavigation />
      <main>{children}</main>
      <Footer />
    </section>
  );
}
