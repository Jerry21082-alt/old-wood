"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu, toggleCart } from "@/features/navigation/navigationSlice";
import { toggleShowMe } from "@/features/overlay/overlaySlice";
import { debounce } from "@/helpers/debounce";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleMobileMenu = useSelector((state) => state.navigation.isMenuOpen);
  const openCart = useSelector((state) => state.navigation.isCartOpen);
  const cartLength = useSelector((state) => state.cart.cartItems).length;

  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    const handleWindowScroll = () => {
      const windowHight = window.scrollY;
      if (windowHight > 56) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", debounce(handleWindowScroll, 10));

    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [isScrolled]);

  const handleCartToggle = () => {
    dispatch(toggleShowMe());
    dispatch(toggleCart());
  };

  const handleMenuOpen = () => {
    dispatch(toggleShowMe());
    dispatch(toggleMenu());
  };

  const handleMenuClose = () => {
    if (openCart) {
      dispatch(toggleCart());
      dispatch(toggleShowMe());
    }

    if (toggleMobileMenu) {
      dispatch(toggleMenu());
      dispatch(toggleShowMe());
    }
  };

  const backgroundChanged = isScrolled || toggleMobileMenu || openCart;
  const revealX = toggleMobileMenu || openCart;

  return (
    <section
      className={`w-full fixed top-0 nav-container h-[62.5px] header header-transparent ${
        backgroundChanged ? "scrolled shadow-sm" : ""
      }`}
      style={{
        display: pathname === "/checkout_page" ? "none" : "block",
        zIndex: openCart || toggleMobileMenu ? "50" : "30",
      }}
    >
      <div
        className="flex items-center p-5"
        style={{ color: pathname !== "/" ? "#221f20" : "" }}
      >
        <h1 className="text-2xl relative logo">
          <Link href={`/`} className="block">
            OLDWOOD
          </Link>
        </h1>
        <div className="flex justify-end items-center w-full">
          <button
            type="button"
            className="flex space-x-2"
            onClick={handleCartToggle}
          >
            <span className="inline-block">Cart</span>
            <span className="inline-block">{isMounted && cartLength}</span>
          </button>
          <div className={`w-5 h-5 ml-7 relative flex items-center`}>
            <div
              className={`hamburger-menu absolute w-full ${
                revealX ? "hide-hamburger-menu" : ""
              }`}
              style={{
                background: pathname !== "/" ? "#221f20" : null,
              }}
              onClick={handleMenuOpen}
            />
            <div
              className="x-icon"
              style={{
                visibility: revealX ? "visible" : "hidden",
              }}
              onClick={handleMenuClose}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
