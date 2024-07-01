"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "@/features/navigation/navigationSlice";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMobileMenu = useSelector((state) => state.navigation.isMenuOpen);
  const cartLength = useSelector((state) => state.cart.cartItems).length;

  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const handleWindowScroll = () => {
      const windowHight = window.scrollY;
      if (windowHight > 56) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleWindowScroll);

    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [isScrolled]);

  // const openMobileMenu = () => dispatch(toggleMenu());

  const backgroundChanged = isScrolled || toggleMobileMenu;

  return (
    <section
      className={`w-full fixed top-0 z-20 nav-container h-[62.5px] header header-transparent ${
        backgroundChanged ? "scrolled shadow-sm" : ""
      }`}
    >
      <div
        className="flex items-center p-5"
        style={{ color: pathname !== "/" ? "#221f20" : "" }}
      >
        <h1 className="text-2xl block relative logo">
          <Link href={`/`}>OLDWOOD</Link>
        </h1>
        <div className="flex justify-end items-center w-full text-white">
          <div className="flex space-x-2">
            <span className="inline-block">Cart</span>
            <span className="inline-block">{cartLength}</span>
          </div>
          <div
            className={`w-5 h-5 ml-7 relative flex items-center`}
            onClick={() => dispatch(toggleMenu())}
          >
            <div
              className={`hamburger-menu ${!toggleMobileMenu ? "active" : ""}`}
              style={{ background: pathname !== "/" ? "#221f20" : "" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
