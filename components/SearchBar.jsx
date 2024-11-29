"use client";

import { toggleSearch } from "@/features/navigation/navigationSlice";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function SearchBar() {
  const openSearch = useSelector((state) => state.navigation.isSearchOpen);
  const [query, setQuery] = useState("Napoleon");

  const searchBarRef = useRef(null);
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();

  const onClose = () => dispatch(toggleSearch());

  const fetchData = async () => {
    try {
      const res = await fetch(
        `/api/products?search=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      console.log("fetch data", data);
    } catch (error) {
      console.log("Failed to search product", error);
    }
  };
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

  useEffect(() => {
    if (openSearch) {
      searchInputRef.current?.focus();
    }
  }, [openSearch]);

  const handleClickOutside = (event) => {
    const current = searchBarRef.current;

    if (current && !current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div
      ref={searchBarRef}
      className="w-[89vw] max-w-[500px] fixed top-[65.5px] right-0 z-[3] max-h-screen bg-milk flex flex-col"
      style={{
        height: "calc(100% - 65.5px)",
        transform: openSearch ? "translateX(0)" : "translateX(100%)",
        transition:
          "transform .6s cubic-bezier(.75,0,.175,1), visibility .6s cubic-bezier(.75,0,.175,1)",
      }}
    >
      <span
        className={`fixed top-0 right-full w-screen h-screen drawer__overlay ${
          openSearch ? "open" : ""
        }`}
        onClick={onClose}
      ></span>
      <div className="items-center flex flex-wrap pb-[60px] overflow-x-hidden overflow-y-auto flex-grow px-6 md:px-10">
        <div>
          <h3 className="h4 text-[34px] text-lightBrown block mb-8">
            What can we help you find?
          </h3>

          <form className="relative flex items-center mb-[60px]">
            <input
              type="text"
              // value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              placeholder="Search"
              aria-label="search"
              className="py-[10px] border-lightBrown border-b h-[52px] w-full min-w-[300px] appearance-none search-input"
              style={{ background: "transparent" }}
              ref={searchInputRef}
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

          <p className="text-[1rem]">
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
