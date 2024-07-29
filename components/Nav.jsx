"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMenu,
  toggleCart,
  closeAll,
  toggleOverlay,
  isCartOpen,
} from "@/features/navigation/navigationSlice";
import { debounce } from "@/helpers/debounce";
import { mobileMenuList } from "@/constants";
import { gsap } from "gsap";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMobileMenu = useSelector((state) => state.navigation.isMenuOpen);
  const openCart = useSelector((state) => state.navigation.isCartOpen);
  const cartLength = useSelector((state) => state.cart.cartItems).length;

  const cartLinkRef = useRef(null);
  const menuContainerRef = useRef([]);

  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    const nav = document.getElementById("navigation");

    nav.addEventListener("mouseenter", () => setIsHovered(true));
    nav.addEventListener("mouseleave", () => setIsHovered(false));

    return () => {
      nav.removeEventListener("mouseenter", () => setIsHovered(true));
      nav.removeEventListener("mouseleave", () => setIsHovered(false));
    };
  }, []);

  useEffect(() => {
    const shop = document.getElementById("shop");
    const shopReveal = document.getElementById("shop-nav_reveal");
    const container = document.querySelectorAll("#menu-container");

    const handleMouseEnter = () => {
      shopReveal.style.visibility = "visible";
      shopReveal.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      shopReveal.style.visibility = "hidden";
      shopReveal.style.opacity = "0";
    };

    shop.addEventListener("mouseenter", function () {
      handleMouseEnter();
      const items = gsap.utils.toArray(container);

      gsap.fromTo(
        items,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }
      );
    });
    shop.addEventListener("mouseleave", handleMouseLeave);
    shopReveal.addEventListener("mouseenter", handleMouseEnter);
    shopReveal.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      shop.removeEventListener("mouseenter", function () {
        handleMouseEnter();
        const items = gsap.utils.toArray(container);

        gsap.fromTo(
          items,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }
        );
      });
      shop.removeEventListener("mouseleave", handleMouseLeave);
      shopReveal.removeEventListener("mouseenter", handleMouseEnter);
      shopReveal.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
    dispatch(toggleCart());
  };

  const changeDefaultLink = (ev) => {
    ev.preventDefault();
  };

  const handleMenuOpen = () => {
    dispatch(toggleOverlay());
    dispatch(toggleMenu());
  };

  const handleMenuClose = () => {
    dispatch(closeAll());
  };

  const backgroundChanged =
    isScrolled || toggleMobileMenu || openCart || isHovered;
  const revealX = toggleMobileMenu || openCart;

  return (
    <section
      className={`w-full fixed top-0 nav-container h-[62.5px] header header-transparent flex justify-center items-center ${
        backgroundChanged || isHovered ? "scrolled shadow-sm" : ""
      }`}
      style={{
        display: pathname === "/checkout_page" ? "none" : "block",
        zIndex: openCart || toggleMobileMenu ? "50" : "30",
      }}
      id="navigation"
    >
      <div
        className="flex md:hidden items-center p-5"
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
            <span className="inline-block text-sm capitalize">Cart</span>
            <span className="inline-block text-sm">
              {isMounted && cartLength}
            </span>
          </button>
          <div className={`w-4 h-4 ml-7 relative flex items-center`}>
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
      <div className="px-10 h-full hidden md:block relative">
        <div className="flex items-center">
          <nav className="flex items-center justify-end flex-1">
            <div className="flex">
              <ul className="flex flex-wrap">
                <li className="uppercase text-[13px] flex items-center flex-shrink-0 mr-[55px]">
                  <Link
                    href="/"
                    className="relative block w-max desktop-link"
                    id="shop"
                  >
                    Shop
                  </Link>

                  <div
                    className="absolute bg-milk left-0 top-full w-full mt-[1px]"
                    style={{
                      visibility: "hidden",
                      opacity: "0",
                      transition:
                        "visibility .25s ease-in-out, opacity .25s ease-in-out",
                    }}
                    id="shop-nav_reveal"
                  >
                    <div className="w-full relative z-[2px] px-10">
                      <div className="w-full flex flex-wrap pt-[45px] pb-[60px] overflow-visible z-[1px]">
                        <div className="flex justify-between w-full flex-wrap">
                          <div
                            className="mr-16"
                            id="menu-container"
                            // ref={(el) => (menuContainerRef.current[idx] = el)}
                          >
                            <Link
                              href="/"
                              className="text-darkGray text-[16px] mb-4 block w-max relative"
                            >
                              Furniture
                            </Link>
                            <ul className="h2 text-[16px]">
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Tables
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Seating
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Casegoods
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div className="mr-16" id="menu-container">
                            <Link
                              href="/"
                              className="text-darkGray text-[16px] mb-4 block w-max relative"
                            >
                              Decor
                            </Link>
                            <ul className="text-[16px] h2">
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Vases & Vassels
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Decorative Objects
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Bowls & Dishes
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Mirrors
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Utility
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Bath Accessories
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div className="mr-16" id="menu-container">
                            <Link
                              href="/"
                              className="text-darkGray text-[16px] mb-4 block w-max relative"
                            >
                              Dinnging & Entertainment
                            </Link>
                            <ul className="text-[16px] h2">
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Kitchen Accessories
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Serving Dishes
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Barware
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Utensils
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Candleholders
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Glassware
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div className="mr-16" id="menu-container">
                            <Link
                              href="/"
                              className="text-darkGray text-[16px] mb-4 block w-max relative"
                            >
                              Soft Goods
                            </Link>
                            <ul className="text-[16px] h2">
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Pillows
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div className="mr-16" id="menu-container">
                            <Link
                              href="/"
                              className="text-darkGray text-[16px] mb-4 block w-max relative"
                            >
                              Lighting
                            </Link>
                            <ul className="text-[16px] h2">
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Table Lamps
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="mr-16" id="menu-container">
                            <Link
                              href="/"
                              className="text-darkGray text-[16px] mb-4 block w-max relative"
                            >
                              Art
                            </Link>
                            <ul className="text-[16px] h2">
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Vintage
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                  className="py-[5px] relative w-max inline-block break-words text-darkBrown capitalize link-animated"
                                >
                                  Artisan
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="uppercase text-[13px] flex items-center flex-shrink-0 mr-[55px]">
                  <Link href="/">Collections</Link>
                </li>
                <li className="uppercase text-[13px] flex items-center flex-shrink-0 mr-[55px]">
                  <Link href="/">About</Link>
                </li>
                <li className="uppercase text-[13px] flex items-center flex-shrink-0 mr-[55px]">
                  <Link href="/">In Situ</Link>
                </li>
              </ul>
              <ul className="flex flex-nowrap">
                <li className="flex items-center uppercase text-[13px] mr-[55px] cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="15"
                    height="15"
                    viewBox="0 0 30 30"
                    fill={backgroundChanged ? "" : "#f3f1ea"}
                    className="mr-3"
                  >
                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                  </svg>
                  <a href="/cart">search</a>
                </li>
                <li className="flex items-center uppercase text-[13px] mr-[55px] cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 101 101"
                    width="16"
                    height="16"
                    id="user"
                    fill={backgroundChanged ? "" : "#f3f1ea"}
                    className="mr-3"
                  >
                    <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"></path>
                  </svg>
                  <a href="/cart">login</a>
                </li>
                <li
                  className="flex items-center uppercase text-[13px] cursor-pointer"
                  onClick={handleCartToggle}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    id="shopping-bag"
                    fill={backgroundChanged ? "" : "#f3f1ea"}
                    className="mr-3"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z"></path>
                  </svg>
                  <a href="/cart" ref={cartLinkRef} onClick={changeDefaultLink}>
                    cart
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <h1 className="mr-10 -order-1 block relative">
            <Link href="" className="block w-max">
              <span className="uppercase">Oldwood</span>
            </Link>
          </h1>
        </div>
      </div>
    </section>
  );
}
