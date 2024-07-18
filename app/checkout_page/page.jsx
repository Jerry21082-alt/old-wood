"use client";

import { formatPrice } from "@/helpers/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Checkout_Page() {
  const searchParams = useSearchParams();
  const totalPrice = parseFloat(searchParams.get("totalPrice"));

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isFocus, setIsFocus] = useState(false);
  const [hideSummary, setHideSummary] = useState(false);

  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <section className="w-full">
      <nav className="flex items-center justify-center w-full border-b border-listBorder relative">
        <div className="p-4">
          <div>
            <Link href="/" className="logo text-4xl">
              oldwood
            </Link>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              id="shopping-bag"
              width="20px"
              height="20px"
            >
              <path d="M41.3 14.58a5 5 0 0 0-5-4.58H34a10 10 0 0 0-20 0h-2.32a5 5 0 0 0-5 4.58l-2.36 28a5 5 0 0 0 5 5.39h29.35a5 5 0 0 0 5-5.4ZM24 2a8 8 0 0 1 8 8H16a8 8 0 0 1 8-8Zm14.67 44H9.33a3 3 0 0 1-3-3.23l2.35-28a3 3 0 0 1 3-2.75H14v6h-1a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2h-1V12h16v6h-1a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2h-1v-6h2.32a3 3 0 0 1 3 2.75l2.35 28a3 3 0 0 1-3 3.25Z"></path>
            </svg>
          </div>
        </div>
      </nav>

      <main className="w-full">
        <div className="w-full border-listBorder border-b flex items-center justify-between p-4">
          <div
            className="flex items-center space-x-1"
            onClick={() => setHideSummary((prev) => !prev)}
          >
            <span className="text-sm inline-block">Show order summary</span>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="chevron-down"
                width="20px"
                height="20px"
              >
                <path d="M12,15a1,1,0,0,1-.71-.29l-4-4A1,1,0,0,1,8.71,9.29L12,12.59l3.29-3.29a1,1,0,0,1,1.41,1.41l-4,4A1,1,0,0,1,12,15Z"></path>
              </svg>
            </div>
          </div>

          <div>
            <span className="text-[#000]">${formatPrice(totalPrice)}</span>
          </div>
        </div>

        <div
          style={{
            height: hideSummary ? "0px" : "auto",
            overflow: hideSummary ? "hidden" : "visible",
          }}
        >
          <div className="bg-milk w-full p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative border-listBorder border-[2px] rounded-md px-2">
                  <div className="w-12 h-auto">
                    <Image
                      src={cartItems[0].primaryImage}
                      alt="product image"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="absolute -top-2 -right-1 rounded-full w-6 h-6 flex items-center justify-center bg-transparentBlack">
                    <span className="text-sm text-milk">
                      {cartItems[0].quantity}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-balck mb-2">
                    {cartItems[0].name}
                  </span>
                  <p className="text-xs">Natural</p>
                </div>
              </div>

              <div>
                <span className="text-sm text-black">
                  ${cartItems[0].price}
                </span>
              </div>
            </div>

            <div className="mt-6 w-full space-x-2 grid-items">
              <div
                className={`${
                  isFocus ? "border-black" : "border-listBorder"
                } border-2 p-3 rounded-md promoCode`}
                tabIndex={0}
                onClick={handleFocus}
                onBlur={handleBlur}
                style={{ transition: "border-color .25s ease" }}
              >
                <input
                  type="text"
                  placeholder="Discount code or giftcard"
                  ref={inputRef}
                />
              </div>

              <div>
                <button
                  type="button"
                  className="p-3 h-full border-listBorder border-2 rounded-md text-xs bg-ligthGrey"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="flex flex-col mt-6 w-full">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-black text-sm">Subtotal</span>
                </div>
                <div>
                  <span className="text-black text-sm">
                    ${formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex justify-start  items-center content-center space-x-1">
                  <span className="text-sm text-black block">Shipping</span>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      id="question"
                    >
                      <path d="M12 24C5.4 24 0 18.6 0 12S5.4 0 12 0s12 5.4 12 12-5.4 12-12 12zm0-22C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"></path>
                      <path d="M12 16c-.6 0-1-.4-1-1v-.7c0-1.5.8-2.8 2-3.5.8-.4 1.2-1.3 1-2.1-.1-.8-.8-1.5-1.6-1.6-.6-.1-1.2 0-1.7.4-.4.3-.7.9-.7 1.5s-.4 1-1 1-1-.4-1-1c0-1.2.5-2.3 1.4-3.1.9-.8 2.1-1.1 3.3-.9 1.6.3 2.9 1.6 3.2 3.2.3 1.7-.5 3.4-2 4.2-.6.3-.9 1-.9 1.8v.8c0 .6-.4 1-1 1z"></path>
                      <circle cx="12" cy="18" r="1"></circle>
                      <path d="M12 19.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm0-2c-.3 0-.5.2-.5.5s.2.5.5.5.5-.2.5-.5-.2-.5-.5-.5z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-sm">Enter shipping address</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black text-lg">Total</span>
                <span className="text-black text-lg">
                  ${formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
