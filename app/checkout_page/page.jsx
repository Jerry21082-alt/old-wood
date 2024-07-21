"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/helpers/formatPrice";
import { useSearchParams } from "next/navigation";

const countries = [
  { name: "Unites State", value: "US" },
  { name: "Australia", value: "AUS" },
  { name: "Canada", value: "CAD" },
  { name: "Netherlands", value: "NAD" },
  { name: "Nigeria", value: "NG" },
];

const provinces = [
  "California",
  "Texas",
  "Florida",
  "New York",
  "Illinois",
  "Pennsylvania",
  "Ohio",
  "Georgia",
  "North Carolina",
  "Michigan",
  "New Jersey",
  "Virginia",
  "Washington",
  "Arizona",
  "Massachusetts",
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const totalPrice = parseFloat(searchParams.get("totalPrice"));

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isFocus, setIsFocus] = useState(false);
  const [hideSummary, setHideSummary] = useState(true);
  const [newsLetter, setNewsLetter] = useState(false);
  const [height, setHeight] = useState("0px");
  const [isMounted, setIsMounted] = useState(false);

  const collapseRef = useRef(null);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (collapseRef.current) {
      setHeight(hideSummary ? "0px" : `${collapseRef.current.scrollHeight}px`);
    }
  }, [hideSummary]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const inputContainer = document.querySelectorAll("#focus_input");

      const handleFocus = (div) => {
        const input = div.querySelector("input");
        input.focus();
        div.style.borderColor = "#000";
      };

      const handleBlur = (div) => {
        div.style.borderColor = "rgba(0,0,0,.045)";
      };

      inputContainer.forEach((el) => {
        const input = el.querySelector("input");
        if (input) {
          el.addEventListener("click", () => handleFocus(el));
          input.addEventListener("blur", () => handleBlur(el));
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const handleFocus = () => {
    inputRef.current.focus();
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const toggleSummary = () => {
    setHideSummary(!hideSummary);
  };

  return (
    <section className="w-full">
      <nav className="flex items-center justify-center w-full bg-milk border-b border-listBorder relative">
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
          <div className="flex items-center space-x-1" onClick={toggleSummary}>
            <span className="text-sm inline-block">Show order summary</span>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="chevron-down"
                width="20px"
                height="20px"
                className={`${hideSummary ? "" : "rotate-180"}`}
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
            maxHeight: height,
            overflow: "hidden",
            transition: "max-height 0.5s ease",
          }}
          id="collapse"
          ref={collapseRef}
        >
          <div className="bg-milk w-full p-4">
            {isMounted &&
              cartItems.map((item, idx) => (
                <div
                  className="flex items-center justify-between mb-4"
                  key={idx}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative border-listBorder border-[2px] rounded-md px-2">
                      <div className="w-12 h-auto">
                        <Image
                          src={item.primaryImage}
                          alt="product image"
                          width={500}
                          height={500}
                        />
                      </div>
                      <div className="absolute -top-2 -right-1 rounded-full w-6 h-6 flex items-center justify-center bg-transparentBlack">
                        <span className="text-sm text-milk">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-balck mb-2">
                        {item.name}
                      </span>
                      <p className="text-xs">Natural</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-black">${item.price}</span>
                  </div>
                </div>
              ))}
            <div className="mt-6 w-full space-x-2 grid-items">
              <div
                className={`p-3 rounded-md promoCode`}
                tabIndex={0}
                onClick={handleFocus}
                style={{ transition: "border-color .25s ease" }}
                id="focus_input"
              >
                <input type="text" placeholder="Discount code or giftcard" />
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

        <div className="px-6 w-full mt-6">
          <p className="text-sm text-black text-center">Express checkout</p>
          <div className="flex items-center justify-between space-x-3 mt-4">
            <button className="w-full bg-milk py-2 overflow-hidden px-4 rounded-md flex items-center justify-center">
              <svg
                width="90"
                height="30"
                viewBox="0 0 683 164"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M454.942 0C441.175 0 430.015 11.1602 430.015 24.927V138.295C430.015 152.062 441.175 163.222 454.942 163.222H658.072C671.839 163.222 682.999 152.062 682.999 138.295V24.927C682.999 11.1602 671.839 0 658.072 0H454.942ZM490.023 113.902V85.1661H508.1C524.616 85.1661 533.399 75.9057 533.399 61.872C533.399 47.8383 524.616 39.4371 508.1 39.4371H478.376V113.902H490.023ZM490.023 50.5114H505.427C516.119 50.5114 521.37 54.9029 521.37 62.2539C521.37 69.6049 516.31 73.9964 505.904 73.9964H490.023V50.5114ZM553.933 115.429C562.811 115.429 568.635 111.515 571.308 104.832C572.071 112.279 576.558 116.098 586.296 113.52L586.391 105.596C582.477 105.978 581.714 104.546 581.714 100.441V80.9655C581.714 69.5094 574.172 62.7312 560.233 62.7312C546.486 62.7312 538.562 69.6049 538.562 81.2519H549.255C549.255 75.7148 553.169 72.3734 560.042 72.3734C567.298 72.3734 570.639 75.5239 570.544 80.9655V83.4477L558.229 84.7842C544.386 86.3117 536.748 91.5624 536.748 100.727C536.748 108.269 542.095 115.429 553.933 115.429ZM556.319 106.837C550.305 106.837 547.918 103.591 547.918 100.345C547.918 95.9539 552.882 93.9491 562.62 92.8035L570.257 91.9443C569.78 100.345 564.148 106.837 556.319 106.837ZM621.754 117.625C616.885 129.463 609.057 132.995 596.837 132.995H591.586V123.258H597.219C603.902 123.258 607.148 121.157 610.68 115.143L589.009 64.2587H601.038L616.504 101.396L630.251 64.2587H641.993L621.754 117.625Z"
                  fill="#5433EB"
                />
                <path
                  d="M57.3945 71.7445C41.4471 68.2852 34.3427 66.9315 34.3427 60.7862C34.3427 55.0063 39.1506 52.127 48.7662 52.127C57.2228 52.127 63.4043 55.8228 67.9545 63.0638C68.2979 63.6225 69.0062 63.8159 69.5857 63.5151L87.5292 54.4476C88.1731 54.1253 88.4092 53.3088 88.0443 52.6857C80.5965 39.7721 66.8384 32.7029 48.7233 32.7029C24.9203 32.7029 10.132 44.4347 10.132 63.0853C10.132 82.8962 28.1398 87.9027 44.1086 91.3621C60.0774 94.8215 67.2033 96.1751 67.2033 102.32C67.2033 108.466 62.0091 111.366 51.6423 111.366C42.0696 111.366 34.9652 106.983 30.6725 98.4742C30.3505 97.8511 29.5993 97.5933 28.9769 97.9156L11.0764 106.79C10.4539 107.112 10.1964 107.864 10.5183 108.509C17.6227 122.797 32.1964 130.833 51.6637 130.833C76.454 130.833 91.4355 119.295 91.4355 100.064C91.4355 80.8335 73.3418 75.2469 57.3945 71.7875V71.7445Z"
                  fill="#5433EB"
                />
                <path
                  d="M153.551 32.7032C143.377 32.7032 134.384 36.3129 127.924 42.7375C127.516 43.1243 126.85 42.845 126.85 42.2863V1.26785C126.85 0.558781 126.292 0.00012207 125.584 0.00012207H103.133C102.425 0.00012207 101.867 0.558781 101.867 1.26785V128.578C101.867 129.287 102.425 129.845 103.133 129.845H125.584C126.292 129.845 126.85 129.287 126.85 128.578V72.7332C126.85 61.9468 135.114 53.6743 146.253 53.6743C157.393 53.6743 165.463 61.7749 165.463 72.7332V128.578C165.463 129.287 166.021 129.845 166.729 129.845H189.18C189.889 129.845 190.447 129.287 190.447 128.578V72.7332C190.447 49.2695 175.079 32.7246 153.551 32.7246V32.7032Z"
                  fill="#5433EB"
                />
                <path
                  d="M235.991 29.0505C223.8 29.0505 212.381 32.7893 204.182 38.1825C203.624 38.5477 203.431 39.2998 203.774 39.8799L213.669 56.7901C214.034 57.3917 214.806 57.6066 215.407 57.2413C221.632 53.4811 228.758 51.5258 236.034 51.5688C255.63 51.5688 270.032 65.4063 270.032 83.6917C270.032 99.2697 258.506 110.808 243.889 110.808C231.977 110.808 223.714 103.868 223.714 94.0698C223.714 88.4618 226.096 83.8636 232.299 80.619C232.943 80.2753 233.179 79.4802 232.793 78.8571L223.456 63.0428C223.156 62.5271 222.512 62.2907 221.932 62.5056C209.419 67.1468 200.641 78.3199 200.641 93.3178C200.641 116.008 218.691 132.94 243.868 132.94C273.273 132.94 294.414 112.549 294.414 83.3049C294.414 51.9556 269.817 29.0505 235.991 29.0505Z"
                  fill="#5433EB"
                />
                <path
                  d="M360.069 32.5311C348.714 32.5311 338.584 36.7211 331.179 44.1126C330.771 44.5208 330.106 44.22 330.106 43.6613V34.7658C330.106 34.0567 329.548 33.498 328.839 33.498H306.968C306.26 33.498 305.702 34.0567 305.702 34.7658V161.882C305.702 162.591 306.26 163.15 306.968 163.15H329.419C330.127 163.15 330.685 162.591 330.685 161.882V120.198C330.685 119.639 331.351 119.36 331.758 119.725C339.142 126.601 348.908 130.619 360.09 130.619C386.426 130.619 406.966 109.282 406.966 81.5642C406.966 53.8461 386.404 32.5096 360.09 32.5096L360.069 32.5311ZM355.84 109.089C340.859 109.089 329.505 97.1637 329.505 81.3923C329.505 65.6209 340.837 53.6957 355.84 53.6957C370.843 53.6957 382.155 65.4275 382.155 81.3923C382.155 97.357 370.994 109.089 355.819 109.089H355.84Z"
                  fill="#5433EB"
                />
              </svg>
            </button>
            <button className="w-full bg-black py-2 overflow-hidden px-4 rounded-md flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="30"
                viewBox="0 0 437 174"
              >
                <g fill="none" fill-rule="nonzero">
                  <path
                    fill="#5F6368"
                    d="M207.2 84.6v50.8h-16.1V10h42.7c10.3-.2 20.2 3.7 27.7 10.9 7.5 6.7 11.7 16.4 11.5 26.4.2 10.1-4 19.8-11.5 26.6-7.5 7.1-16.7 10.7-27.6 10.7h-26.7zm0-59.2v43.8h27c6 .2 11.8-2.2 15.9-6.5 8.5-8.2 8.6-21.7.4-30.2l-.4-.4c-4.1-4.4-9.9-6.8-15.9-6.6l-27-.1zM310.1 46.8c11.9 0 21.3 3.2 28.2 9.5 6.9 6.4 10.3 15.1 10.3 26.2v52.8h-15.4v-11.9h-.7c-6.7 9.8-15.5 14.7-26.6 14.7-9.4 0-17.4-2.8-23.7-8.4-6.2-5.2-9.7-12.9-9.5-21 0-8.9 3.4-15.9 10.1-21.2 6.7-5.3 15.7-7.9 26.9-7.9 9.6 0 17.4 1.8 23.6 5.2v-3.7c0-5.5-2.4-10.7-6.6-14.2-4.3-3.8-9.8-5.9-15.5-5.9-9 0-16.1 3.8-21.4 11.4l-14.2-8.9c7.7-11.1 19.2-16.7 34.5-16.7zm-20.8 62.3c0 4.2 2 8.1 5.3 10.5 3.6 2.8 8 4.3 12.5 4.2 6.8 0 13.3-2.7 18.1-7.5 5.3-5 8-10.9 8-17.7-5-4-12-6-21-6-6.5 0-12 1.6-16.4 4.7-4.3 3.2-6.5 7.1-6.5 11.8zM437 49.6l-53.8 123.6h-16.6l20-43.2-35.4-80.3h17.5l25.5 61.6h.4l24.9-61.6z"
                  />
                  <path
                    fill="#4285F4"
                    d="M142.1 73.6c0-4.9-.4-9.8-1.2-14.6H73v27.7h38.9c-1.6 8.9-6.8 16.9-14.4 21.9v18h23.2c13.6-12.5 21.4-31 21.4-53z"
                  />
                  <path
                    fill="#34A853"
                    d="M73 144c19.4 0 35.8-6.4 47.7-17.4l-23.2-18c-6.5 4.4-14.8 6.9-24.5 6.9-18.8 0-34.7-12.7-40.4-29.7H8.7v18.6C20.9 128.6 45.8 144 73 144z"
                  />
                  <path
                    fill="#FBBC04"
                    d="M32.6 85.8c-3-8.9-3-18.6 0-27.6V39.7H8.7a71.39 71.39 0 0 0 0 64.6l23.9-18.5z"
                  />
                  <path
                    fill="#EA4335"
                    d="M73 28.5c10.3-.2 20.2 3.7 27.6 10.8l20.5-20.5C108.1 6.5 90.9-.2 73 0 45.8 0 20.9 15.4 8.7 39.7l23.9 18.6C38.3 41.2 54.2 28.5 73 28.5z"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex w-full items-center justify-center mt-6 px-6">
          <div className="w-full h-[1px] bg-listBorder" />
          <p className="justify-center text-sm mx-4 relative" id="or">
            OR
          </p>
          <div className="w-full h-[1px] bg-listBorder" />
        </div>

        <div className="flex items-center justify-between w-full mt-6 px-6">
          <div>
            <span className="text-black text-lg">Contact</span>
          </div>
          <div>
            <Link href="/" className="underline text-sm text-balck">
              Login
            </Link>
          </div>
        </div>

        <div className="mt-4 w-full px-6">
          <div
            className={`border-2 border-inputBorder p-3 rounded-md promoCode`}
            tabIndex={0}
            style={{ transition: "border-color .25s ease" }}
            id="focus_input"
          >
            <input type="text" placeholder="Email or mobile phone number" />
          </div>
        </div>

        <div className="flex space-x-2 px-6 mt-6">
          <div
            className="relative"
            onClick={() => setNewsLetter((prev) => !prev)}
          >
            <input
              type="checkbox"
              style={{ backgroundColor: newsLetter ? "#000" : "transparent" }}
              className="appearance-none border border-listBorder w-5 h-5 rounded-sm relative"
            />
            <span
              className="block absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ display: newsLetter ? "block" : "none" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="#FFFFFF"
              >
                <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path>
              </svg>
            </span>
          </div>
          <p className="text-black text-sm">Email me with news and offers</p>
        </div>

        <section className="px-6 mt-8 delivery">
          <h4 className="text-black">Delivery</h4>
          <div
            className={`relative mt-4 border-2 border-inputBorder rounded-md p-3`}
            id="focus_input"
          >
            <label className="absolute left-4 top-0 hidden">
              <span className="text-xs text-black">Country/Region</span>
            </label>

            <select
              name="countryCode"
              id="select0"
              required
              autoComplete="shipping country"
              className="w-full outline-none mt-1 text-sm text-black text-balance"
            >
              {countries.map((country) => (
                <option value={country.name} key={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 w-full">
            <div
              className={`border-2 border-inputBorder p-3 rounded-md promoCode`}
              tabIndex={0}
              style={{
                transition: "border-color .25s ease",
              }}
              id="focus_input"
            >
              <input type="text" placeholder="First name" />
            </div>
          </div>
          <div className="my-4 w-full">
            <div
              className={`border-2 border-inputBorder p-3 rounded-md promoCode`}
              tabIndex={0}
              style={{
                transition: "border-color .25s ease",
              }}
              id="focus_input"
            >
              <input type="text" placeholder="Last name" />
            </div>
          </div>
          <div className="my-4 w-full">
            <div
              className={`border-2 border-inputBorder p-3 rounded-md promoCode`}
              tabIndex={0}
              style={{
                transition: "border-color .25s ease",
              }}
              id="focus_input"
            >
              <input type="text" placeholder="Company (optional)" />
            </div>
          </div>
          <div className="my-4 w-full">
            <div
              className={`border-2 border-inputBorder p-3 rounded-md flex items-center justify-between space-x-2 promoCode`}
              tabIndex={0}
              style={{
                transition: "border-color .25s ease",
              }}
              id="focus_input"
            >
              <input type="text" placeholder="Address" className="w-full" />

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="18"
                  height="18"
                  viewBox="0 0 30 30"
                  fill="rgb(25, 25, 25)"
                >
                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="my-4 w-full">
            <div
              className={`border-2 border-inputBorder p-3 rounded-md promoCode`}
              tabIndex={0}
              style={{
                transition: "border-color .25s ease",
              }}
              id="focus_input"
            >
              <input
                type="text"
                placeholder="Appartment, suite, etc. (optional)"
                className="w-full"
              />
            </div>
          </div>
          <div className="my-4 w-full">
            <div
              className={`border-2 border-inputBorder p-3 rounded-md promoCode`}
              tabIndex={0}
              style={{
                transition: "border-color .25s ease",
              }}
              id="focus_input"
            >
              <input type="text" placeholder="City" className="w-full" />
            </div>
          </div>
          <div
            className={`relative mt-4 border-2 border-inputBorder rounded-md p-3`}
            id="focus_input"
          >
            <select
              name="countryCode"
              id="select0"
              required
              autoComplete="shipping country"
              className="w-full outline-none mt-1 text-sm text-black text-balance"
            >
              {provinces.map((province) => (
                <option value={province} key={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4 w-full">
            <div
              className={`border-2 border-inputBorder p-3 rounded-md promoCode`}
              tabIndex={0}
              style={{
                transition: "border-color .25s ease",
              }}
              id="focus_input"
            >
              <input type="text" placeholder="Postal code" className="w-full" />
            </div>
          </div>
          <div className="my-4 w-full">
            <div
              className={`border-2 border-inputBorder p-3 rounded-md flex items-center justify-between space-x-2 promoCode`}
              tabIndex={0}
              style={{
                transition: "border-color .25s ease",
              }}
              id="focus_input"
            >
              <input
                type="text"
                placeholder="Phone (optional)"
                className="w-full"
              />

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
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
          </div>
        </section>

        <section>
          <div className="mt-6 px-6">
            <span className="mb-4 block text-black">Shipping method</span>
            <div className="bg-milk rounded-md mb-8 p-4">
              <p className="text-sm">
                Enter your shipping address to view available shipping methods.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mt-8 px-6">
            <h4 className="text-black">Payment</h4>
            <p className="pb-2 text-sm">
              All transactions are secure and encrypted.
            </p>
          </div>

          <div className="border-inputBorder px-6 overflow-hidden rounded-md">
            <div
              className="w-full border rounded-t-md p-4 overflow-hidden flex justify-between items-center bg-inputBorder"
              style={{ borderColor: "rgb(46,46,46)" }}
            >
              <div className="relative flex items-center space-x-3">
                <input
                  type="radio"
                  className="h-5 w-5 rounded-full bg-clip-padding"
                  style={{
                    borderColor: "rgb(46,46,46)",
                    border: ".43em solid",
                  }}
                />

                <div>
                  <span className="text-sm text-black">Credit card</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-5">
                  <Image
                    src={"/f11b90c2972f3811f2d5.svg"}
                    width={500}
                    height={500}
                    alt="amex payment"
                  />
                </div>
                <div className="w-8 h-5">
                  <Image
                    src={"/0169695890db3db16bfe.svg"}
                    width={500}
                    height={500}
                    alt="visa payment"
                  />
                </div>
                <div className="w-8 h-5">
                  <Image
                    src={"/ae9ceec48b1dc489596c.svg"}
                    width={500}
                    height={500}
                    alt="mastercard payment"
                  />
                </div>
                <button className="w-8 h-5 bg-white p-2 flex items-center justify-center text-xs text-black rounded-sm">
                  +5
                </button>
              </div>
            </div>

            <div className="w-full bg-inputBorder p-4">
              <div className="my-4 w-full">
                <div
                  className={`border-2 p-3 rounded-md flex items-center justify-between space-x-2 promoCode`}
                  tabIndex={0}
                  style={{
                    transition: "border-color .25s ease",
                    borderColor: "rgb(211,209,202)",
                  }}
                  id="focus_input"
                >
                  <input
                    type="text"
                    placeholder="Card number"
                    className="w-full"
                  />

                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="18"
                      height="18"
                      viewBox="0 0 50 50"
                    >
                      <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="my-4 w-full">
                <div
                  className={`border-2 p-3 rounded-md flex items-center justify-between space-x-2 promoCode`}
                  tabIndex={0}
                  style={{
                    transition: "border-color .25s ease",
                    borderColor: "rgb(211,209,202)",
                  }}
                  id="focus_input"
                >
                  <input
                    type="text"
                    placeholder="Expiration date (MM/YY)"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="my-4 w-full">
                <div
                  className={`border-2 p-3 rounded-md flex items-center justify-between space-x-2 promoCode`}
                  tabIndex={0}
                  style={{
                    transition: "border-color .25s ease",
                    borderColor: "rgb(211,209,202)",
                  }}
                  id="focus_input"
                >
                  <input
                    type="text"
                    placeholder="Security code"
                    className="w-full"
                  />

                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
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
                <div className="my-4 w-full">
                  <div
                    className={`border-2 p-3 rounded-md flex items-center justify-between space-x-2 promoCode`}
                    tabIndex={0}
                    style={{
                      transition: "border-color .25s ease",
                      borderColor: "rgb(211,209,202)",
                    }}
                    id="focus_input"
                  >
                    <input
                      type="text"
                      placeholder="Name on card"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-4 boder rounded-b-md border"
              style={{ borderColor: "rgb(211,209,202)" }}
            >
              <label>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="h-5 w-5 rounded-full bg-clip-padding"
                    style={{
                      borderColor: "rgb(46,46,46)",
                      border: ".43em solid",
                    }}
                  />

                  <div className="w-full flex items-center">
                    <div className="w-20">
                      <Image
                        src="/Shop Pay logo purple.svg"
                        alt="shop pay logo"
                        width={500}
                        height={500}
                      />
                    </div>
                    <span className="mx-2">|</span>
                    <p className="text-sm text-black">
                      Pay in full or installments
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </section>
        <section>
          <div className="p-6">
            <span className="text-black text-lg">Remember me</span>
          </div>
        </section>
      </main>
    </section>
  );
}

export default function Checkout_Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
