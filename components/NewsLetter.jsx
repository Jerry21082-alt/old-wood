import { delay } from "@/helpers";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function NewsLetter() {
  const [showNewsLetter, setShowNewsLetter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const newsLetterRef = useRef(null);

  const styles = {
    general: {
      transform: isMobile
        ? `${showNewsLetter ? "translateY(0%)" : "translateY(100%)"}`
        : `${showNewsLetter ? "scale(1)" : "scale(0.8)"}`,
      opacity: showNewsLetter ? "1" : "0",
      visibility: showNewsLetter ? "visible" : "hidden",
      transition:
        "transform .4s ease-in-out, opacity .4s ease-in-out, visibility .4s ease-in-out",
      maxHeight: "calc(100vh - 160px)",
    },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setIsMobile(window.innerWidth <= 999);
      handleResize();

      window.addEventListener("resize", handleResize);

      return function () {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    async function handleDelay() {
      await delay(2000);
      setShowNewsLetter(true);
    }

    handleDelay();
  }, []);

  useEffect(() => {
    if (showNewsLetter) {
      document.addEventListener("click", closeNewsLetterModal);
    }

    return () => document.removeEventListener("click", closeNewsLetterModal);
  }, [showNewsLetter, onClose]);

  function onClose() {
    setShowNewsLetter(false);
  }
  const closeNewsLetterModal = (event) => {
    const current = newsLetterRef.current;
    if (current && !current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div
      ref={newsLetterRef}
      className="flow-root bottom-0 overflow-hidden md:overflow-auto will-change-transform m-6 md:m-10 bg-milk z-50 fixed right-0"
      style={styles.general}
    >
      <button
        onClick={onClose}
        type="button"
        className="absolute right-6 top-6 z-10 touch-manipulation"
      >
        <svg focusable="false" width="14" height="14" viewBox="0 0 14 14">
          <path
            d="M13 13L1 1M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          ></path>
        </svg>
      </button>

      <div className="flex flex-col items-center">
        <div className="max-w-[700px] w-[90%] overflow-auto py-14 px-7">
          <div className="text-lightBrown uppercase">Join the r list</div>
          <div className="h2 mt-4 text-xl md:text-4xl">
            Sign-up to receive 10% off your first purchase and you'll hear about
            our new product collections, antiquities, and more before anyone
            else!
          </div>

          <div className="mt-[45px]">
            <div className="w-full">
              <div style={{ transform: "translate(0px, 0px)" }}>
                <form
                  aria-live="polite"
                  style={{
                    display: "flex",
                    width: "100%",
                    overflow: "visible",
                    maxWidth: "600px",
                  }}
                >
                  <div className="w-full h-[14px] flex items-center justify-between space-x-2">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="outline-none bg-milk h-full w-full"
                    />

                    <div className="h-[14px] w-[14px]">
                      <Image
                        src="/arrow-right-form.png"
                        width={500}
                        height={500}
                        alt="submit icon"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </form>
                <div className="mt-[9px] bg-listBorder h-[1px] w-full relative">
                  <div className="absolute right-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
