import React from "react";

export default function page() {
  return (
    <div>
      <div className="w-full px-6 md:px-10 max-w-[1600px] mt-[66.5px]">
        <div className="relative my-[100px]">
          <h1 className="text-5xl h2 block mb-[.5em]">Search</h1>

          <form className="max-w-[390px] relative">
            <button
              type="button"
              className="absolute overflow-visible appearance-none touch-manipulation"
              style={{ top: "calc(50% - 3px)", right: "3px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="14"
                height="13"
                viewBox="0 0 30 30"
              >
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
              </svg>
            </button>
            <input
              type="text"
              aria-label="search product"
              autoCorrect="off"
              placeholder="What can we help you find?"
              className="border-b border-lightBrown w-full h-[54px] leading-[54] search-input"
              style={{ background: "transparent" }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
