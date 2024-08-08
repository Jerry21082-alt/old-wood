"use client";

import { toggleSearch } from "@/features/navigation/navigationSlice";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function SearchBar() {
  const openSearch = useSelector((state) => state.navigation.isSearchOpen);

  const searchBarRef = useRef(null);
  const dispatch = useDispatch();

  const onClose = () => dispatch(toggleSearch());

  useEffect(() => {
    const handleSearchEscape = (event) => {
      if (searchBarRef.current && event.key === "Escape") {
        onClose();
      }

      return;
    };

    if (openSearch) {
      document.addEventListener("keydown", handleSearchEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleSearchEscape);
    };
  }, [openSearch, onClose]);

  useEffect(() => {
    if (openSearch && searchBarRef.current) {
      document.addEventListener("click", handleClickOutside);
    } else {
      return;
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openSearch, onClose]);

  const handleClickOutside = (event) => {
    const current = searchBarRef.current;

    if (current && !current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div
      ref={searchBarRef}
      className="max-w-[89vw] fixed top-[67.5px] right-0 z-50 max-h-screen bg-milk flex flex-col"
      style={{
        height: "calc(100% - 65.5px)",
        transform: openSearch ? "translateX(0)" : "translateX(100%)",
        transition:
          "transform .6s cubic-bezier(.75,0,.175,1), visibility .6s cubic-bezier(.75,0,.175,1)",
      }}
    >
      <div className="items-center flex flex-wrap pb-[60px] overflow-x-hidden overflow-y-auto flex-grow px-6 md:px-10">
        <div>
          <h3
            className="h4 text-3xl md:text-4xl lg:text-5xl block mb-8"
            style={{ color: "rgb(34, 31, 32)" }}
          >
            What can we help you find?
          </h3>

          <form className="relative flex items-center mb-[60px]">
            <input
              type="text"
              autoComplete="off"
              placeholder="Search"
              aria-label="search"
              className="py-[10px] border-lightBrown border-b h-[52px] w-full min-w-[300px] appearance-none search-input"
              style={{ background: "transparent" }}
            />
            <svg
              focusable="false"
              width="24"
              height="24"
              viewBox="0 0 17 14"
              className="absolute right-0 text-lightBrown"
            >
              <path
                d="M0 7h15M9 1l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              ></path>
            </svg>
          </form>

          <p className="text-[18px] md:text-xl lg:text-2xl">
            Can't find what you're looking for? Check out our{" "}
            <a
              className="text-lightBrown underline"
              href="
          /"
            >
              FAQ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
