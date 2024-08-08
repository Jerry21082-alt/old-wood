"use client";

import { useEffect, useState } from "react";

export default function page() {
  const [isMobile, setIsMobile] = useState(false);

  const styles = {
    general: {
      backgroundImage: `url('https://roweam.com/cdn/shop/files/roweam-image16.jpg?v=1686630364')`,
      display: isMobile ? "none" : "block",
    },
    aboutSection: {
      minHeight: isMobile ? "calc(100vh - 62.5px)" : "calc(100vh - 65.5px)",
      gridTemplateColumns: isMobile ? "100%" : "calc(100% - 500px) 500px",
    },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowResize = () => setIsMobile(window.innerWidth <= 999);

      handleWindowResize();

      window.addEventListener("resize", handleWindowResize);

      return function () {
        window.removeEventListener("resize", handleWindowResize);
      };
    }

    return;
  }, []);

  return (
    <section
      className="mt-[62.6px] md:mt-[66.5px]"
      style={{ scrollMarginTop: "66.5px" }}
    >
      <div className="grid" style={styles.aboutSection}>
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat bg-[#a5a097]"
          style={styles.general}
        ></div>
        <div className="flex w-full h-full flex-wrap items-center p-6 md:p-10 bg-milk border-t border-listBorder">
          <div className="relative w-full">
            <div className="my-[30px] max-w-full">
              <h1 className="h4 my-12 mr-6 block text-3xl md:text-4xl lg:text-5xl">
                Register
              </h1>

              <div>
                <p>
                  Designer?{" "}
                  <a href="/" className="text-lightBrown underline">
                    Apply for your trade account here.
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full max-w-[1200px]">
              <div className="grid gap-y-8">
                <div>
                  <form name="login">
                    <div className="flex flex-wrap relative">
                      <input
                        type="text"
                        id="customer[firstname]"
                        className="order-2 border-lightBrown border-b w-full h-[52px]"
                        style={{ background: "transparent" }}
                      />
                      <label
                        htmlFor="customer[firstname]"
                        className="relative top-0 left-0 text-lightBrown"
                      >
                        First name
                      </label>
                    </div>
                    <div className="flex flex-wrap relative mt-4">
                      <input
                        type="text"
                        id="customer[lastname]"
                        className="order-2 border-lightBrown border-b w-full h-[52px]"
                        style={{ background: "transparent" }}
                      />
                      <label
                        htmlFor="customer[lastname]"
                        className="relative top-0 left-0 text-lightBrown"
                      >
                        Last name
                      </label>
                    </div>
                    <div className="flex flex-wrap relative mt-4">
                      <input
                        type="email"
                        id="customer[email]"
                        className="order-2 border-lightBrown border-b w-full h-[52px]"
                        style={{ background: "transparent" }}
                      />
                      <label
                        htmlFor="customer[email]"
                        className="relative top-0 left-0 text-lightBrown"
                      >
                        E-mail
                      </label>
                    </div>
                    <div className="flex flex-wrap relative mt-4">
                      <input
                        type="password"
                        id="customer[password]"
                        className="order-2 border-lightBrown border-b w-full h-[52px]"
                        style={{ background: "transparent" }}
                      />
                      <label
                        htmlFor="customer[password]"
                        className="relative top-0 left-0 text-lightBrown"
                      >
                        Password
                      </label>
                    </div>
                    <button
                      style={{ fontSize: "calc(1rem - 2px)" }}
                      type="button"
                      className="px-[35px] w-full whitespace-nowrap relative inline-block text-milk bg-lightBrown mt-8 my-[15px] overflow-visible cursor-pointer touch-manipulation h-auto leading-[45px]"
                    >
                      <span className="flex items-center justify-center">
                        Create account
                      </span>
                    </button>

                    <button
                      type="button"
                      className="text-lightBrown relative inline-block appearance-none text-center w-max cursor-pointer touch-manipulation text-sm shop-button"
                    >
                      <a href="/accounts/login">login to existing account</a>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
