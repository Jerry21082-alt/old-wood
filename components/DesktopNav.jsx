import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMenu,
  toggleCart,
  closeAll,
  toggleOverlay,
} from "@/features/navigation/navigationSlice";
import { debounce } from "@/helpers/debounce";
import { gsap } from "gsap";
import AspectRatioContainer from "./AspectRatioContainer";

export default function DesktopNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMobileMenu = useSelector((state) => state.navigation.isMenuOpen);
  const openCart = useSelector((state) => state.navigation.isCartOpen);
  const cartLength = useSelector((state) => state.cart.cartItems).length;

  const cartLinkRef = useRef(null);

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
    const container = shopReveal.querySelectorAll("#menu-container");

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
    const collection = document.getElementById("collection");
    const collectionReveal = document.getElementById("collection_reveal");
    const container = collectionReveal.querySelectorAll("#menu-container");

    const handleMouseEnter = () => {
      collectionReveal.style.visibility = "visible";
      collectionReveal.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      collectionReveal.style.visibility = "hidden";
      collectionReveal.style.opacity = "0";
    };

    collection.addEventListener("mouseenter", function () {
      handleMouseEnter();
      const items = gsap.utils.toArray(container);

      gsap.fromTo(
        items,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }
      );
    });
    collection.addEventListener("mouseleave", handleMouseLeave);
    collectionReveal.addEventListener("mouseenter", handleMouseEnter);
    collectionReveal.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      collection.removeEventListener("mouseenter", function () {
        handleMouseEnter();
        const items = gsap.utils.toArray(container);

        gsap.fromTo(
          items,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }
        );
      });
      collection.removeEventListener("mouseleave", handleMouseLeave);
      collectionReveal.removeEventListener("mouseenter", handleMouseEnter);
      collectionReveal.removeEventListener("mouseleave", handleMouseLeave);
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
    <div
      className={`w-full fixed md:hidden top-0 nav-container h-[62.5px] header header-transparent flex justify-center items-center ${
        backgroundChanged ? "scrolled shadow-sm" : ""
      }`}
      style={{
        display: pathname === "/checkout_page" ? "none" : "block",
        zIndex: openCart || toggleMobileMenu ? "50" : "30",
      }}
      id="navigation"
    >
      <div
        className="px-10 h-full hidden md:block relative desktop-nav_links"
        style={{ color: pathname !== "/" ? "#221f20" : "" }}
      >
        <div className="flex items-center">
          <nav className="flex items-center justify-end flex-1">
            <div className="flex">
              <ul className="flex flex-wrap">
                <li className="uppercase text-[13px] flex items-center flex-shrink-0 mr-[45px] ">
                  <Link href="/" className="relative block" id="shop">
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
                          <div className="mr-16" id="menu-container">
                            <Link
                              href="/"
                              className="text-darkGray text-xs mb-4 block w-max relative"
                            >
                              Furniture
                            </Link>
                            <ul className="h2 text-xs">
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
                              className="text-darkGray text-xs mb-4 block w-max relative"
                            >
                              Decor
                            </Link>
                            <ul className="h2">
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
                              className="text-darkGray text-xs mb-4 block w-max relative"
                            >
                              Dinnging & Entertainment
                            </Link>
                            <ul className="h2">
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
                              className="text-darkGray text-xs mb-4 block w-max relative"
                            >
                              Soft Goods
                            </Link>
                            <ul className="h2">
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
                              className="text-darkGray text-xs mb-4 block w-max relative"
                            >
                              Lighting
                            </Link>
                            <ul className="h2">
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
                              className="text-darkGray text-xs mb-4 block w-max relative"
                            >
                              Art
                            </Link>
                            <ul className="h2">
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
                        <div className="mt-[45px] mb-[-30px]">
                          <div className="pb-[10px] text-lightBrown text-[14px]">
                            <Link href="/" className="uppercase">
                              shop all
                            </Link>
                          </div>

                          <div>
                            <p className="normal-case text-[15px] underline decoration-lightBrown">
                              Just browsing?{" "}
                              <a href="/">Here is a great place to start.</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="uppercase text-[13px] flex items-center flex-shrink-0 mr-[45px]">
                  <Link href="/" id="collection">
                    Collections
                  </Link>

                  <div
                    className="absolute bg-milk left-0 top-full w-full mt-[1px] z-10"
                    style={{
                      visibility: "hidden",
                      opacity: "0",
                      transition:
                        "visibility .25s ease-in-out, opacity .25s ease-in-out",
                    }}
                    id="collection_reveal"
                  >
                    <div className="relative z-[2] w-full px-10">
                      <div className="flex pt-[45px] pb-[60px] overflow-visible relative z-[1]">
                        <div className="flex justify-between flex-wrap w-full">
                          <div className="mr-16" id="menu-container">
                            <Link
                              href="/"
                              className="text-darkGray mb-4 text-xs block"
                            >
                              Collection
                            </Link>
                            <ul>
                              <li>
                                <Link
                                  href=""
                                  className="text-xs py-[5px] break-words relative w-max"
                                >
                                  Sabi Collection
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href=""
                                  className="text-xs py-[5px] break-words relative w-max"
                                >
                                  Pavillion Collection
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href=""
                                  className="text-xs py-[5px] break-words relative w-max"
                                >
                                  Disc Collection
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href=""
                                  className="text-xs py-[5px] break-words relative w-max"
                                >
                                  View All
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="grid grid-flow-col items-start gap-5">
                          <Link href="/" id="menu-container">
                            <div className="w-[220px] mb-[18px] overflow-hidden">
                              <AspectRatioContainer aspectRatio={1 / 1}>
                                <img
                                  src="//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_8020b2fd-b6a5-4792-9b77-820b7b037654.jpg?v=1717179520&width=2082"
                                  srcSet="//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_8020b2fd-b6a5-4792-9b77-820b7b037654.jpg?v=1717179520&width=352 352w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_8020b2fd-b6a5-4792-9b77-820b7b037654.jpg?v=1717179520&width=832 832w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_8020b2fd-b6a5-4792-9b77-820b7b037654.jpg?v=1717179520&width=1200 1200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_8020b2fd-b6a5-4792-9b77-820b7b037654.jpg?v=1717179520&width=1920 1920w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_8020b2fd-b6a5-4792-9b77-820b7b037654.jpg?v=1717179520&width=2082 2082w"
                                  alt="sabi collection"
                                  className="object-cover object-center w-full h-full"
                                />
                              </AspectRatioContainer>
                            </div>
                            <span className="relative w-max block text-xs collection-title">
                              Sabi Collection
                            </span>
                          </Link>
                          <Link href="/" id="menu-container">
                            <div className="w-[220px] mb-[18px] overflow-hidden">
                              <AspectRatioContainer>
                                <img
                                  src="//roweam.com/cdn/shop/files/Roweam_Environmental_101725_Pavilion_Chair_0833_1.jpg?v=1721917047&width=2500"
                                  srcSet="//roweam.com/cdn/shop/files/Roweam_Environmental_101725_Pavilion_Chair_0833_1.jpg?v=1721917047&width=352 352w, //roweam.com/cdn/shop/files/Roweam_Environmental_101725_Pavilion_Chair_0833_1.jpg?v=1721917047&width=832 832w, //roweam.com/cdn/shop/files/Roweam_Environmental_101725_Pavilion_Chair_0833_1.jpg?v=1721917047&width=1200 1200w, //roweam.com/cdn/shop/files/Roweam_Environmental_101725_Pavilion_Chair_0833_1.jpg?v=1721917047&width=1920 1920w, //roweam.com/cdn/shop/files/Roweam_Environmental_101725_Pavilion_Chair_0833_1.jpg?v=1721917047&width=2500 2500w"
                                  alt="sabi collection"
                                  className="object-cover object-center h-full w-full"
                                />
                              </AspectRatioContainer>
                            </div>
                            <span className="relative w-max block text-xs collection-title">
                              Pavillion Collection
                            </span>
                          </Link>
                          <Link href="/" id="menu-container">
                            <div className="w-[220px] mb-[18px] overflow-hidden">
                              <AspectRatioContainer>
                                <img
                                  src="//roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2557_RESIZED_FOR_MEGA_MENU.jpg?v=1694965257&width=2500"
                                  srcSet="//roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2557_RESIZED_FOR_MEGA_MENU.jpg?v=1694965257&width=352 352w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2557_RESIZED_FOR_MEGA_MENU.jpg?v=1694965257&width=832 832w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2557_RESIZED_FOR_MEGA_MENU.jpg?v=1694965257&width=1200 1200w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2557_RESIZED_FOR_MEGA_MENU.jpg?v=1694965257&width=1920 1920w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2557_RESIZED_FOR_MEGA_MENU.jpg?v=1694965257&width=2500 2500w"
                                  alt="product image"
                                  className="object-over object-center w-full h-full"
                                />
                              </AspectRatioContainer>
                            </div>
                            <span className="relative w-max block text-xs collection-title">
                              Disc Collection
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="uppercase text-xs flex items-center flex-shrink-0 mr-[45px]">
                  <Link href="/about_page">About</Link>
                </li>
                <li className="uppercase text-xs flex items-center flex-shrink-0 mr-[45px]">
                  <Link href="/insitu">In Situ</Link>
                </li>
              </ul>
              <ul className="flex flex-nowrap">
                <li className="flex items-center uppercase text-xs mr-[45px] cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="15"
                    height="15"
                    viewBox="0 0 30 30"
                    fill={backgroundChanged ? "" : "#f3f1ea"}
                    style={{
                      fill: pathname !== "/" ? "#221f20" : "",
                      transition: "fill .25s ease-in-out",
                    }}
                    className="mr-[10px]"
                  >
                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                  </svg>
                  <a href="/cart">search</a>
                </li>
                <li className="flex items-center uppercase text-xs mr-[45px] cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 101 101"
                    width="16"
                    height="16"
                    id="user"
                    fill={backgroundChanged ? "" : "#f3f1ea"}
                    style={{
                      fill: pathname !== "/" ? "#221f20" : "",
                      transition: "fill .25s ease-in-out",
                    }}
                    className="mr-[10px]"
                  >
                    <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"></path>
                  </svg>
                  <a href="/cart">login</a>
                </li>
                <li
                  className="flex items-center uppercase text-xs cursor-pointer"
                  onClick={handleCartToggle}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    id="shopping-bag"
                    fill={backgroundChanged ? "" : "#f3f1ea"}
                    style={{
                      fill: pathname !== "/" ? "#221f20" : "",
                      transition: "fill .25s ease-in-out",
                    }}
                    className="mr-[10px]"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z"></path>
                  </svg>
                  <a href="/cart" ref={cartLinkRef} onClick={changeDefaultLink}>
                    cart
                  </a>
                  <div>
                    <span className="ml-3">{isMounted && cartLength}</span>
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          <h1 className="mr-10 -order-1 block relative">
            <Link href="/" className="block w-max">
              <span className="uppercase">Oldwood</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
