"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/features/navigation/navigationSlice";
import { toggleSearch } from "@/features/navigation/navigationSlice";
import { usePathname, useRouter } from "next/navigation";

const useScreen = (screen) => {
  const [screenSize, setScreenSize] = useState(false);

  function handleScreenSize() {
    if (typeof window !== "undefined") {
      const isMatch = window.innerWidth >= screen;
      setScreenSize(isMatch);
    }
  }

  useEffect(() => {
    handleScreenSize();
    window.addEventListener("resize", handleScreenSize);

    return () => window.removeEventListener("resize", handleScreenSize);
  }, [screen]);

  return screenSize;
};

const isScrolled = () => {
  const [scroll, setScroll] = useState(false);

  function handleScroll() {
    if (typeof window !== "undefined") {
      const nav = document.querySelector(".nav_container");
      if (!nav) return;

      const navHeight = nav.offsetHeight;
      let lastPos = 0;
      const currentPos = window.scrollY;

      if (currentPos > lastPos && currentPos > navHeight) {
        setScroll(true);
      } else setScroll(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
};

const hideElement = (element) => {
  if (element) {
    element.style.opacity = 0;
    element.style.visibility = "hidden";
  }
};

const showElement = (element) => {
  if (element) {
    element.style.opacity = 1;
    element.style.visibility = "visible";
  }
};

const addClass = (element, className) => {
  if (element) element.classList.add(className);
};

const removeClass = (element, className) => {
  if (element) element.classList.remove(className);
};

const animateItems = (items) => {
  if (!items) return;

  const arrayItems = Array.from(items);

  gsap.fromTo(
    arrayItems,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.25, stagger: 0.05 }
  );
};

export default function Nav() {
  const isDesktop = useScreen(768);
  const scrolled = isScrolled();

  const dispatch = useDispatch();
  const pathname = usePathname();
  const cartOpen = useSelector((state) => state.navigation.isCartOpen);
  const openSearch = useSelector((state) => state.navigation.isSearchOpen);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const headerPrimaryLinks = [
    {
      link_text: "Shop",
      href: "/collections/all",
    },
    {
      link_text: "Collections",
      href: "/blogs/collections",
    },
    {
      link_text: "About",
      href: "/about_page",
    },
    { link_text: "Insitu", href: "/insitu" },
  ];
  const shopItemsLinks = [
    {
      heading: "Furniture",
      links: ["Tables", "Seating", "Casegoods"],
    },
    {
      heading: "Decor",
      links: [
        "Vases & Vessels",
        "Docorative Objects",
        "Bowls & Dishes",
        "Mirrors",
        "Utiliy",
        "Bath Accessories",
      ],
    },
    {
      heading: "Dinnning & Entertaining",
      links: [
        "Kitchen Accessories",
        "Serving Dishes",
        "Barware",
        "Utensils",
        "Candleholders",
        "Glassware",
      ],
    },
    { heading: "Soft Goods", links: ["Pillows"] },
    { heading: "Lighting", links: ["Table Lamps"] },
    { heading: "Art", links: ["Vintage", "Artisan"] },
  ];
  const collectionItemsLinks = {
    heading: "Collections",
    links: [
      "The Heritage Harvest Collection",
      "The Anniversary Collection",
      "Sabi Collection",
      "Pavillion Collection",
      "Disc Collection",
      "View All",
    ],
    cards: [
      {
        imgSrc:
          "//roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1729014217&width=1190",
        imgSrcSet:
          "//roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1729014217&width=352 352w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1729014217&width=832 832w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1729014217&width=1190 1190w",
        name: "The Anniversary Collection",
      },
      {
        imgSrc:
          "//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_33138d35-903c-4cf0-8c32-9281068f6bea.jpg?v=1717411808&width=2082",
        imgSrcSet:
          "//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_33138d35-903c-4cf0-8c32-9281068f6bea.jpg?v=1717411808&width=352 352w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_33138d35-903c-4cf0-8c32-9281068f6bea.jpg?v=1717411808&width=832 832w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_33138d35-903c-4cf0-8c32-9281068f6bea.jpg?v=1717411808&width=1200 1200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_33138d35-903c-4cf0-8c32-9281068f6bea.jpg?v=1717411808&width=1920 1920w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_33138d35-903c-4cf0-8c32-9281068f6bea.jpg?v=1717411808&width=2082 2082w",
        name: "Sabi Collection",
      },
      {
        imgSrc:
          "//roweam.com/cdn/shop/files/Roweam_Environmental_101725_Pavilion_Chair_0833_1.jpg?v=1721917047&width=2500",
        imgSrcSet:
          "//roweam.com/cdn/shop/files/Roweam_Environmental_101725_Pavilion_Chair_0833_1.jpg?v=1721917047&width=352 352w, //roweam.com/cdn/shop/files/Roweam_Environmental_101725_Pavilion_Chair_0833_1.jpg?v=1721917047&width=832 832w, //roweam.com/cdn/shop/files/Roweam_Environmental_101725_Pavilion_Chair_0833_1.jpg?v=1721917047&width=1200 1200w, //roweam.com/cdn/shop/files/Roweam_Environmental_101725_Pavilion_Chair_0833_1.jpg?v=1721917047&width=1920 1920w, //roweam.com/cdn/shop/files/Roweam_Environmental_101725_Pavilion_Chair_0833_1.jpg?v=1721917047&width=2500 2500w",
        name: "Pavillion Collection",
      },
    ],
  };

  const setupMenuInteraction = () => {
    // Query DOM elements
    const queryDomElements = () => ({
      linkItems: document.querySelectorAll(".link__items > a"),
      megaMenu: document.querySelector(".mega__menu"),
      navContainer: document.querySelector(".nav_container"),
      navHeader: document.querySelector(".header"),
      shopMenu: document.querySelector("#shop_menu"),
      collectionMenu: document.querySelector("#collection_menu"),
      shopItems: document.querySelectorAll("#shop_items"),
      collectionCards: document.querySelectorAll("#collection_card"),
      defaultLinks: document.querySelectorAll(".prevent-default"),
    });

    const dom = queryDomElements();
    const {
      linkItems,
      megaMenu,
      navContainer,
      navHeader,
      shopMenu,
      collectionMenu,
      shopItems,
      collectionCards,
      defaultLinks,
    } = dom;

    Object.values(dom).forEach((element) => {
      if (!element) {
        console.warn("Required DOM element not found!");
        return;
      }
    });

    // Find buttons by text content
    const findButtonByText = (buttons, text) =>
      Array.from(buttons).find((btn) => btn.innerText.trim() === text);

    const shopBtn = findButtonByText(linkItems, "SHOP");

    const collectionBtn = findButtonByText(linkItems, "COLLECTIONS");

    // Event Handlers
    const handleShowMegaMenu = () => showElement(megaMenu);
    const handleHideMegaMenu = (e) => {
      if (!megaMenu.contains(e.relatedTarget)) hideElement(megaMenu);
    };

    const handleShowShopMenu = () => {
      showElement(megaMenu);
      removeClass(shopMenu, "hidden");
      addClass(collectionMenu, "hidden");
      animateItems(shopItems);
    };

    const handleShowCollectionMenu = () => {
      showElement(megaMenu);
      addClass(shopMenu, "hidden");
      removeClass(collectionMenu, "hidden");
      animateItems(collectionCards);
    };

    // Attach Event Listeners
    collectionBtn?.addEventListener("mouseenter", handleShowCollectionMenu);
    collectionBtn?.addEventListener("mouseleave", handleHideMegaMenu);
    collectionBtn?.addEventListener("click", () => hideElement(megaMenu));
    shopBtn?.addEventListener("mouseenter", handleShowShopMenu);
    shopBtn?.addEventListener("mouseleave", handleHideMegaMenu);
    shopBtn?.addEventListener("click", () => hideElement(megaMenu));
    megaMenu.addEventListener("mouseenter", handleShowMegaMenu);
    megaMenu.addEventListener("mouseleave", () => hideElement(megaMenu));
  };

  const removeMenuInteraction = () => {
    // Query DOM elements
    const queryDomElements = () => ({
      linkItems: document.querySelectorAll(".link__items > a"),
      megaMenu: document.querySelector(".mega__menu"),
      navContainer: document.querySelector(".nav_container"),
      navHeader: document.querySelector(".header"),
      shopMenu: document.querySelector(".shop_menu"),
      shopItems: document.querySelectorAll("#shop_items"),
    });

    const dom = queryDomElements();

    const {
      linkItems,
      megaMenu,
      navContainer,
      navHeader,
      shopMenu,
      shopItems,
    } = dom;

    if (!linkItems || !megaMenu || !navContainer || !navHeader || !shopMenu) {
      console.warn("Required DOM elements not found.");
      return;
    }

    // Find buttons by text content
    const findButtonByText = (buttons, text) =>
      Array.from(buttons).find((btn) => btn.textContent.trim() === text);

    const shopBtn = findButtonByText(linkItems, "SHOP");
    const collectionBtn = findButtonByText(linkItems, "COLLECTIONS");

    // Event Handlers
    const handleShowMegaMenu = () => showElement(megaMenu);
    const handleHideMegaMenu = (e) => {
      if (!megaMenu.contains(e.relatedTarget)) hideElement(megaMenu);
    };

    const handleShowShopMenu = () => {
      showElement(megaMenu);
      removeClass(shopMenu, "hidden");
      animateItems(shopItems);
    };

    const handleShowCollectionMenu = () => {
      showElement(megaMenu);
      addClass(shopMenu, "hidden");
    };

    const toggleNavBorder = (add) =>
      add
        ? addClass(navHeader, "header--bordered")
        : removeClass(navHeader, "header--bordered");

    // Attach Event Listeners
    collectionBtn?.removeEventListener("mouseenter", handleShowCollectionMenu);
    shopBtn?.removeEventListener("mouseenter", handleShowShopMenu);
    shopBtn?.removeEventListener("mouseleave", handleHideMegaMenu);
    // navContainer.removeEventListener("mouseenter", () => toggleNavBorder(true));
    // navContainer.removeEventListener("mouseleave", () => toggleNavBorder(true));
    megaMenu.removeEventListener("mouseenter", handleShowMegaMenu);
    megaMenu.removeEventListener("mouseleave", () => hideElement(megaMenu));
  };

  useEffect(() => {
    setupMenuInteraction();
    return () => removeMenuInteraction();
  }, []);

  const openCart = (e) => {
    e.preventDefault();
    dispatch(toggleCart());
  };

  const openSearchBar = (e) => {
    e.preventDefault();

    dispatch(toggleSearch());
  };

  return (
    <div
      style={{ marginBottom: "calc(-1*65.5%, 0px) + 0px" }}
      className={`fixed top-0 z-[4] right-0 w-full nav_container ${
        scrolled || cartOpen || openSearch ? "reveal" : ""
      }  ${pathname !== "/" ? "not-homepage" : ""}`}
    >
      <div
        className={`block relative header ${
          scrolled || cartOpen || openSearch
            ? "header__hidden header--bordered"
            : ""
        }`}
      >
        <div className="relative z-[2] max-w-[1600px] w-full mx-auto px-6 md:px-10 block">
          <div
            style={{ padding: isDesktop ? "calc(27px - 6px) 0" : "" }}
            className="flex items-center justify-between py-5 md:py-0"
          >
            <nav
              className="justify-end md:flex items-center hidden"
              style={{ flex: "1 1 0" }}
            >
              <div>
                <ul
                  style={{
                    margin: "0 0 !important",
                    gap: isDesktop ? "12px" : "",
                  }}
                  className="flex flex-wrap list-none p-0 m-0"
                  role="list"
                >
                  {headerPrimaryLinks.map((link, i) => (
                    <li
                      key={i}
                      className="uppercase text-[13px] flex items-center font-medium shrink-0 link__items"
                      style={{
                        marginRight:
                          i === headerPrimaryLinks.length - 1 ? "0px" : "55px",
                        letterSpacing: "1.3",
                      }}
                    >
                      <Link
                        href={link.href}
                        className="block relative w-max uppercase text-[13px] text-milk list-none link--animated nav--link"
                        id="default-link"
                        style={{ letterSpacing: "1.3px" }}
                      >
                        {link.link_text}
                      </Link>
                      <div
                        className="mt-[1px] -z-[1] bg-milk absolute top-full left-0 w-full block text-transparent mega__menu"
                        style={{
                          transition:
                            "opacity .25s ease-in-out, visibility .25s ease-in-out",
                          visibility: "hidden",
                          opacity: 0,
                        }}
                      >
                        <div className="relative z-[2] max-w-[1600px] w-full mx-auto px-6 md:px-10">
                          <div
                            className="flex justify-start relative pt-[45px] pb-[60px] overflow-hidden gap-16 z-[1]"
                            style={{ maxHeight: "calc(100vh - 65.5px)" }}
                          >
                            <div
                              className="m-0 w-full flex justify-between flex-wrap"
                              id="shop_menu"
                            >
                              {shopItemsLinks.map((item, i) => (
                                <div
                                  key={i}
                                  id="shop_items"
                                  style={{
                                    opacity: 1,
                                    marginRight:
                                      i === item.links.length - 1
                                        ? "0px"
                                        : "64px",
                                  }}
                                >
                                  <Link
                                    href="/collections/furniture"
                                    className="text-darkGray text-[14px] mb-4 link--animated block relative w-max"
                                  >
                                    {item.heading}
                                  </Link>
                                  <ul className="m-0 p-0 list-none">
                                    {item.links.map((link) => (
                                      <li key={link}>
                                        <Link
                                          href="/collection/tables"
                                          className="normal-case text-[14px] text-shadow py-[5px] inline-block break-words relative link--animated h2"
                                          style={{
                                            opacity: 1,
                                            transition:
                                              "opacity .25s ease-in-out",
                                          }}
                                        >
                                          {link}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <div
                              className="flex justify-between flex-wrap m-0 w-full"
                              id="collection_menu"
                            >
                              <div className="mr-16">
                                <Link
                                  href="/blogs/collections"
                                  className="text-[#a5a097] text-[14px] font-normal mb-4 block w-max relative link--animated"
                                >
                                  {collectionItemsLinks.heading}
                                </Link>
                                <ul className="m-0 list-none">
                                  {collectionItemsLinks.links.map((item, i) => (
                                    <li key={i}>
                                      <Link
                                        href={"/"}
                                        className="py-[5px] text-[14px] normal-case inline-block relative w-max no-underline text-shadow link--animated h2"
                                        style={{
                                          transition:
                                            "opacity .25s ease-in-out",
                                        }}
                                      >
                                        {item}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {collectionItemsLinks.cards.map((card, i) => (
                                <div
                                  key={i}
                                  className="grid grid-flow-col items-start gap-5"
                                  id="collection_card"
                                >
                                  <Link href="/" className="w-auto">
                                    <div className="h-[220px] w-auto mb-[18px] overflow-hidden">
                                      <img
                                        src={card.imgSrc}
                                        srcSet={card.imgSrcSet}
                                        loading="lazy"
                                        alt={card.name}
                                        className="w-full h-full card-img"
                                      />
                                    </div>
                                    <span className="no-underline text-[14px] w-max relative block link--animated text-shadow normal-case">
                                      {card.name}
                                    </span>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="pt-[45px] mb-[30px]">
                            <div className="pb-[10px] text-lightBrown uppercase">
                              Shop All
                            </div>
                            <div className="normal-case text-[15px] text-darkBrown">
                              Just browsing?{" "}
                              <a
                                href="/collections/all"
                                title="shop all"
                                className="text-lightBrown underline"
                              >
                                Here is a great place to start.
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
            <h1 className="mr-10 -order-1 block relative">
              <Link href="/" className="w-max block">
                <span className="hidden">ROWEAM</span>
                <img
                  src="//roweam.com/cdn/shop/files/roweam-logo_320x.png?v=1686631893"
                  alt="logo"
                  className="max-w-[160px] md:max-w-[120px] h-auto block w-max logo--img"
                />
              </Link>
            </h1>
            <div
              className="max-w-max justify-end items-center flex"
              style={{
                flex: "1 1 0",
                color: scrolled ? "rgb(34, 31, 32)" : "#f3f1ea",
              }}
            >
              <div className="gap-5 items-center grid grid-flow-col md:hidden">
                <Link href="/" className="block text-[15px]">
                  <span className="text-[15px]">Cart</span>
                  <div className="ml-[5px] inline">1</div>
                </Link>
              </div>
              <div className="ml-[30px] grid grid-flow-col gap-5 items-center md:hidden">
                <button className="relative block appearance-none touch-manipulation overflow-visible">
                  <span className="visually-hidden">Navigation</span>
                  <svg
                    className="overflow-visible block"
                    focusable="false"
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                  >
                    <path
                      d="M0 1h18M0 13h18H0zm0-6h18H0z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    ></path>
                  </svg>
                </button>
              </div>
              <ul className="hidden md:flex flex-wrap gap-3 list-none">
                <li
                  className="mr-11 font-medium uppercase text-[13px] items-center flex-shrink-0 flex"
                  style={{ color: scrolled ? "#000" : "#f3f1ea" }}
                >
                  <svg
                    viewBox="0 0 101 101"
                    id="search"
                    height="20"
                    className="mr-[10px] w-max"
                    fill="currentColor"
                  >
                    <path d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z"></path>
                  </svg>
                  <Link
                    href="/search"
                    className="w-max block uppercase text-[13px] text-milk nav--link link--animated prevent-default relative"
                    aria-expanded="false"
                    onClick={openSearchBar}
                  >
                    Search
                  </Link>
                </li>
                <li
                  className="mr-11 font-medium uppercase text-[13px] items-center flex-shrink-0 flex"
                  style={{ color: scrolled ? "#000" : "#f3f1ea" }}
                >
                  <svg
                    viewBox="0 0 512 512"
                    id="user"
                    height="19"
                    className="mr-[10px] w-max"
                    fill="currentColor"
                  >
                    <path d="M376.9 175.9c-.3 49.8-31.7 96.2-78.8 113.4-48.2 17.6-102.7 2.8-135.5-36.6-32.4-38.9-36.2-96-10.2-139.1 26-43.3 78.1-66.4 127.7-56.2 49.2 10.1 87.5 50.3 95.5 99.8C376.5 163.4 376.9 169.7 376.9 175.9c.1 9.6 15.1 9.7 15 0-.3-56.7-36-107.9-89.2-127.6-53-19.7-115.2-2.9-151.2 40.7-36.4 44.2-41.7 108.2-11.8 157.4 29.6 48.5 87.3 73.6 142.9 62.8 54.8-10.7 99.1-56.7 107.5-111.9 1.1-7.1 1.7-14.2 1.7-21.3C392 166.3 377 166.3 376.9 175.9zM22.7 469.8c49.5-48.5 111.9-82.8 180.5-94.4 64.5-10.9 131.8-.6 190.7 27.6 35.2 16.9 67.3 39.6 95.3 66.8 6.9 6.7 17.6-3.9 10.6-10.6-51.1-49.4-115.6-85-185.9-97.6-67.8-12.2-137.8-2.8-200.3 26.3C76 405.5 41.8 430.1 12.1 459.2 5.2 465.9 15.8 476.5 22.7 469.8L22.7 469.8z"></path>
                  </svg>
                  <Link
                    href={isLoggedIn ? "/account" : "/accounts/login"}
                    className="w-max block uppercase text-[13px] text-milk nav--link link--animated relative"
                    aria-expanded="false"
                  >
                    {isLoggedIn ? "Account" : "Login"}
                  </Link>
                </li>
                <li
                  className="mr-11 font-medium uppercase text-[13px] items-center flex-shrink-0 flex"
                  style={{ color: scrolled ? "#000" : "#f3f1ea" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    id="shopping-bag"
                    height="20"
                    className="mr-[10px] w-max"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <rect
                      width="192"
                      height="160"
                      x="32"
                      y="48"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                      rx="8"
                    ></rect>
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                      d="M168,88a40,40,0,0,1-80,0"
                    ></path>
                  </svg>

                  <Link
                    href="/cart"
                    className="w-max block uppercase text-[13px] text-milk nav--link link--animated relative prevent-default"
                    aria-expanded="false"
                    onClick={openCart}
                  >
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
