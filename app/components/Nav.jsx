"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <section
      className={`w-full fixed z-10 nav-container h-[62.5px] header header-transparent ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="flex items-center p-5">
        <h1 className="text-2xl block relative logo">
          <Link href={`/`}>OLDWOOD</Link>
        </h1>
        <div className="flex justify-end items-center w-full text-white">
          <div className="flex space-x-2">
            <span className="inline-block">Cart</span>
            <span className="inline-block">0</span>
          </div>
          <div className="w-5 h-5 ml-7 relative flex items-center">
            <div className="hamburger-menu" />
          </div>
        </div>
      </div>
    </section>
  );
}
