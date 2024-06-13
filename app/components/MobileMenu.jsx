"use client";

import Link from "next/link";
import { mobileMenuList } from "../constants";
import { stateProvider } from "./stateContext/UseStateContext";

export default function MobileMenu() {
  const { openMenu, setOpenMenu, toggleMobileMenu } = stateProvider();

  const handleToggleMenu = () => setOpenMenu((previousState) => !previousState);

  return (
    <section
      className={`fixed top-[62.5px] h-screen w-screen flex flex-col z-30 bg-snow right-0 ${
        toggleMobileMenu ? "open-mobile-menu" : "close-mobile-menu"
      }`}
    >
      <div className="overflow-x-hidden overflow-y-auto flex-grow pb-4">
        <ul role="list">
          <li
            className="flow-root border-b border-listBorder"
            onClick={handleToggleMenu}
          >
            <button
              aria-expanded="false"
              className="flex items-center justify-between py-[21px] px-6 w-full text-xs"
            >
              Shop
              <span
                className={`w-[14px] h-[14px] plus-icon relative ${
                  openMenu ? "animate-plus" : ""
                }`}
              ></span>
            </button>

            <div
              style={{
                overflow: openMenu ? "visible" : "hidden",
                maxHeight: openMenu ? "auto" : "0",
              }}
              className="drawer"
            >
              {mobileMenuList.innerMenu.map((list, index) => (
                <ul className="mb-4" key={index}>
                  <li className="border-t border-listBorder py-[21px] px-6 mb-[15px] flow-root">
                    <Link
                      href="/"
                      className="flex items-center justify-between w-full uppercase text-darkGray text-xs"
                    >
                      {list.title}
                    </Link>

                    <ul className="grid-list mt-4">
                      {list.innerList.map((list, index) => (
                        <li
                          className="mb-[14px] flow-root overflow-visible text-darkBrown"
                          key={index}
                        >
                          <Link
                            href="/"
                            className="py-1 text-sm flex items-center justify-between w-full h2"
                          >
                            {list}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
