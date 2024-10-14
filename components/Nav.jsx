"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

const setupMenuInteraction = () => {
  const dom = {
    link_items: document.querySelectorAll(".link__items > a"),
    mega_menu: document.querySelector(".mega__menu"),
    nav_container: document.querySelector(".nav_container"),
    nav_header: document.querySelector(".header"),
    shop_menu: document.querySelector(".shop_menu"),
  };

  const buttons = Array.from(dom.link_items).filter((item) => item.textContent.trim() === "COLLECTIONS" || "SHOP");
  const megaMenu = dom.mega_menu;
  const navContainer = dom.nav_container;
  const navHeader = dom.nav_header;
  const shopMenu = dom.shop_menu

  buttons.forEach((button) => {
    if(button && megaMenu) {
      button.addEventListener("mouseenter", () => {
        if(button.textContent === "SHOP") {
          showElement(megaMenu);
          shopMenu.style.display = "flex";
        }
      });
    }

    button.addEventListener("mouseleave", (e) => {
      if(!megaMenu.contains(e.relatedTarget)) {
        hideElement(megaMenu);
      }
    })
  })

  const handleNavEnter = () => {
    addClass(navContainer, "reveal");
    addClass(navHeader, "header__hidden");
    removeClass(navHeader, "transparent");
  };

  const handleNavLeave = () => {
    removeClass(navContainer, "reveal");
    removeClass(navHeader, "header__hidden");
    addClass(navHeader, "transparent");
  };

  navContainer.addEventListener("mouseenter", handleNavEnter);
  navContainer.addEventListener("mouseleave", handleNavLeave);
  megaMenu.addEventListener("mouseenter", () => showElement(megaMenu));
  megaMenu.addEventListener("mouseleave", () => hideElement(megaMenu));
};

const removeMenuInteraction = () => {
 const dom = {
    link_items: document.querySelectorAll(".link__items > a"),
    mega_menu: document.querySelector(".mega__menu"),
    nav_container: document.querySelector(".nav_container"),
    nav_header: document.querySelector(".header"),
    shop_menu: document.querySelector(".shop_menu"),
  };

  const buttons = Array.from(dom.link_items).filter((item) => item.textContent.trim() === "COLLECTIONS" || "SHOP");
  const megaMenu = dom.mega_menu;
  const navContainer = dom.nav_container;
  const navHeader = dom.nav_header;

  buttons.forEach((button) => {
    if(button && megaMenu) {
      button.removeEventListener("mouseenter", () => showElement(megaMenu));
    }

    button.removeEventListener("mouseleave", (e) => {
      if(!megaMenu.contains(e.relatedTarget)) {
        hideElement(megaMenu);
      }
    })
  })

  const handleNavEnter = () => {
    addClass(navContainer, "reveal");
    addClass(navHeader, "header__hidden");
    removeClass(navHeader, "transparent");
  };

  const handleNavLeave = () => {
    removeClass(navContainer, "reveal");
    removeClass(navHeader, "header__hidden");
    addClass(navHeader, "transparent");
  };

  navContainer.removeEventListener("mouseenter", handleNavEnter);
  navContainer.removeEventListener("mouseleave", handleNavLeave);
  megaMenu.removeEventListener("mouseenter", () => showElement(megaMenu));
  megaMenu.removeEventListener("mouseleave", () => hideElement(megaMenu));
};

export default function Nav() {
  const isDesktop = useScreen(768);
  const navLinks = [
    {
      itemTitle: "SHOP",
      href: "collections/all",
      megaMenu: {
        furniture: {
          heading: "Furniture",
          link_item: ["Tables", "Seating", "Casegoods"],
        },
        decor: {
          heading: "Decor",
          link_item: [
            "Vases & Vessels",
            "Decorative Objects",
            "Bowls & Dishes",
            "Mirrors",
            "Utility",
            "Bath Accessories",
          ],
        },
        dinning_and_entertaining: {
          heading: "Dinning & Entertaining",
          link_item: [
            "Kitchen Accessories",
            "Serving Dishes",
            "Baware",
            "Utensils",
            "Candleholders",
            "Glassware",
          ],
        },
        soft_goods: {
          heading: "Soft Goods",
          link_item: ["Pillows"],
        },
        lighting: {
          heading: "Lighting",
          link_item: ["Table Lamps"],
        },
        art: {
          heading: "Art",
          link_item: ["Vintage", "Artisan"],
        },
      },
    },
    { itemTitle: "COLLECTIONS", href: "/blogs/collections" },
    { itemTitle: "ABOUT", href: "/pages/about" },
    { itemTitle: "INSITU", href: "/blogs/in-situ" },
  ];

  useEffect(() => {
    setupMenuInteraction();
    return () => removeMenuInteraction();
  }, []);

  return (
    <div
      style={{ marginBottom: "calc(-1*65.5%, 0px) + 0px" }}
      className="fixed top-0 z-[4] right-0 w-full nav_container"
    >
      <div
        className="block relative header transparent"
        style={{
          backgroundColor: "transparent",
          transition: "all 0.25s",
          boxShadow: "0 1px transparent",
        }}
      >
        <div className="relative z-[2] max-w-[1600px] w-full mx-auto px-6 md:px-10 block">
          <div
            style={{ padding: isDesktop ? "calc(27px - 6px) 0" : "" }}
            className="flex items-center"
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
                  {navLinks.map((li, i) => (
                    <li
                      key={i}
                      className="uppercase text-[13px] flex items-center shrink-0 link__items"
                      style={{
                        marginRight: li === navLinks.length - 1 ? "55px" : "",
                        letterSpacing: "1.3",
                      }}
                    >
                      <Link
                        href={li.href}
                        className="block relative w-max uppercase text-[13px] list-none link--animated"
                        style={{ letterSpacing: "1.3px" }}
                      >
                        {li.itemTitle}
                      </Link>
                      {li.megaMenu ? (
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
                              <div className="m-0 w-fill justify-between flex flex-wrap shop_menu" style={{display: "none"}}>
                                {Object.values(li.megaMenu).map((item, i) => (
                                  <div
                                    key={i}
                                    style={{
                                      opacity: 1,
                                      marginRight:
                                        item ===
                                        Object.values(li.megaMenu).length - 1
                                          ? "0px"
                                          : "64px",
                                    }}
                                  >
                                    <Link
                                      href="/collections/furniture"
                                      className="text-darkGray text-[16px] mb-4 link--animated block relative w-max"
                                    >
                                      {item.heading}
                                    </Link>
                                    <ul className="m-0 p-0 list-none">
                                      {item.link_item.map((link) => (
                                        <li key={link}>
                                          <Link
                                            href="/collection/tables"
                                            className="normal-case text-[14px] text-shadow py-[5px] inline-block break-words relative link--animated"
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
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
