"use client";

import Link from "next/link";
import { mobileMenuList } from "../constants";
import { stateProvider } from "./stateContext/UseStateContext";
import Image from "next/image";
import Drawer from "./Drawer";

export default function MobileMenu() {
  const { openMenu, setOpenMenu, toggleMobileMenu } = stateProvider();

  const handleToggleMenu = () => setOpenMenu((previousState) => !previousState);

  return (
    <section
      className={`fixed top-[62.5px] h-screen w-screen flex flex-col z-30 bg-snow right-0 ${
        toggleMobileMenu ? "open-mobile-menu" : "close-mobile-menu"
      }`}
    >
      <div className="overflow-x-hidden overflow-y-auto flex-grow pb-4 border border-listBorder drawer-content">
        <ul role="list">
          <Drawer title="Shop" delay="0.4s">
            {mobileMenuList.innerMenu.map((list, index) => (
              <ul className="mb-4" key={index}>
                <li className="border-t border-listBorder py-[21px] px-6 mb-[15px] flow-root">
                  <Link
                    href="/"
                    className="flex items-center justify-between w-full uppercase text-darkGray text-xs animate-link"
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
          </Drawer>

          <Drawer title="Collections" delay="0.5s">
            <ul className="mb-4">
              <li className="border-t border-listBorder py-[21px] px-6 mb-[15px] flow-root">
                <Link
                  href="/"
                  className="flex items-center justify-between w-full uppercase text-darkGray text-xs animate-link"
                >
                  Collections
                </Link>

                <ul className="grid-list mt-4">
                  <li className="mb-[14px] flow-root overflow-visible text-darkBrown">
                    <Link
                      href="/"
                      className="py-1 text-sm flex items-center justify-between w-full h2"
                    >
                      Sabi Collection
                    </Link>
                  </li>
                  <li className="mb-[14px] flow-root overflow-visible text-darkBrown">
                    <Link
                      href="/"
                      className="py-1 text-sm flex items-center justify-between w-full h2"
                    >
                      Revere Collection
                    </Link>
                  </li>
                  <li className="mb-[14px] flow-root overflow-visible text-darkBrown">
                    <Link
                      href="/"
                      className="py-1 text-sm flex items-center justify-between w-full h2"
                    >
                      Disc Collection
                    </Link>
                  </li>
                  <li className="mb-[14px] flow-root overflow-visible text-darkBrown">
                    <Link
                      href="/"
                      className="py-1 text-sm flex items-center justify-between w-full h2"
                    >
                      View All
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <div className="px-6 pb-6 overflow-x-auto overflow-y-hidden">
              <div className="grid-img">
                <div>
                  <Link
                    href="/"
                    className="min-w-0 max-w-full block aspect-square mb-[13px]"
                  >
                    <Image
                      src="/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg"
                      alt="product image"
                      width={500}
                      height={500}
                      className="block object-cover object-center w-full h-full"
                    />
                  </Link>

                  <Link href="" className="text-sm link-animate relative">
                    <span>Sabi Collection</span>
                  </Link>
                </div>
                <div>
                  <Link
                    href="/"
                    className="min-w-0 max-w-full block aspect-square mb-[13px]"
                  >
                    <Image
                      src="/Moore_House_Design_The_Minimalist_club_New_England_Inteiror_Designer_Blair_Moore_Aquidneck_club_kitchen_modern_condo_29_S_1.jpg"
                      alt="product image"
                      width={500}
                      height={500}
                      className="block object-cover object-center w-full h-full"
                    />
                  </Link>

                  <Link href="" className="text-sm link-animate relative">
                    <span>Revere Collection</span>
                  </Link>
                </div>
                <div>
                  <Link
                    href="/"
                    className="min-w-0 max-w-full block aspect-square mb-[13px]"
                  >
                    <Image
                      src="/Roweam_Environmental_101732_Disc_Side_Table_2557_RESIZED_FOR_MEGA_MENU.jpg"
                      alt="product image"
                      width={500}
                      height={500}
                      className="block object-cover object-center w-full h-full"
                    />
                  </Link>

                  <Link href="" className="text-sm link-animate relative">
                    <span>Disc Collection</span>
                  </Link>
                </div>
              </div>
            </div>
          </Drawer>

          <li className="flow-root border-b border-listBorder ">
            <Link
              href="/"
              className="text-darkBrown uppercase flex items-center justify-between py-[21px] px-6 m text-xs animate-link"
              style={{ transitionDelay: "0.55s" }}
            >
              About
            </Link>
          </li>

          <li className="flow-root border-b border-listBorder text-xs">
            <Link
              href="/"
              className="text-darkBrown uppercase px-6 py-[21px] flex justify-between items-center animate-link"
              style={{ transitionDelay: "0.6s" }}
            >
              In Situ
            </Link>
          </li>
          <li className="flow-root border-b border-listBorder text-xs">
            <Link
              href="/"
              className="text-darkBrown uppercase px-6 py-[21px] flex justify-between items-center animate-link"
              style={{ transitionDelay: "0.65s" }}
            >
              Search
            </Link>
          </li>
          <li className="flow-root border-b border-listBorder text-xs">
            <Link
              href="/"
              className="text-darkBrown uppercase px-6 py-[21px] flex justify-between items-center animate-link"
              style={{ transitionDelay: "0.7s" }}
            >
              Account
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
