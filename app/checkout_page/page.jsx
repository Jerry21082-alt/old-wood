"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/helpers/formatPrice";
import { useSearchParams } from "next/navigation";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const totalPrice = parseFloat(searchParams.get("totalPrice"));

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isFocus, setIsFocus] = useState(false);
  const [isMailFocus, setIsMailFocus] = useState(false);
  const [isFirstNameFocus, setIsFirstNameFocus] = useState(false);
  const [isLastNameFocus, setIsLastNameFocus] = useState(false);
  const [hideSummary, setHideSummary] = useState(true);
  const [newsLetter, setNewsLetter] = useState(false);
  const [height, setHeight] = useState("0px");
  const [isMounted, setIsMounted] = useState(false);

  const collapseRef = useRef(null);
  const inputRef = useRef(null);
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const handleLastNameFocus = () => {
    lastNameRef.current.focus();
    setIsLastNameFocus(true);
  };

  const handleLastNameBlur = () => setIsLastNameFocus(false);

  const handleFirstNameFocus = () => {
    firstNameRef.current.focus();
    setIsFirstNameFocus(true);
  };

  const handleMailFocus = () => {
    emailRef.current.focus();
    setIsMailFocus(true);
  };

  const handleFirstNameBlur = () => {
    setIsFirstNameFocus(false);
  };

  const handleMailBlur = () => setIsMailFocus(false);

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

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (collapseRef.current) {
      setHeight(hideSummary ? "0px" : `${collapseRef.current.scrollHeight}px`);
    }
  }, [hideSummary]);

  const countries = [
    { name: "Unites State", value: "US" },
    { name: "Australia", value: "AUS" },
    { name: "Canada", value: "CAD" },
    { name: "Netherlands", value: "NAD" },
    { name: "Nigeria", value: "NG" },
  ];

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
          ref={collapseRef}
          style={{
            maxHeight: height,
            overflow: "hidden",
            transition: "max-height 0.5s ease",
          }}
          id="collapse"
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

        <div className="px-6 w-full mt-6">
          <p className="text-sm text-black text-center">Express checkout</p>
          <div className="flex items-center justify-between space-x-3 mt-4">
            <button className="w-full bg-milk py-2 overflow-hidden px-4 rounded-md flex items-center justify-center">
              <svg
                role="img"
                width="80"
                height="30"
                aria-labelledby="shop-pay-logo"
                viewBox="0 0 424 102"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title id="shop-pay-logo">Shop Pay</title>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M204.916 30.0997C208.894 25.1796 215.067 21.1016 222.436 21.1016C238.98 21.1016 252.012 34.7983 252.001 51.6974C252.001 69.3058 238.903 82.3375 223.189 82.3375C214.834 82.3375 208.44 78.06 206.102 74.4918H205.88V100.356C205.88 100.512 205.818 100.661 205.708 100.771C205.598 100.881 205.449 100.943 205.293 100.943H190.566C190.409 100.943 190.258 100.882 190.146 100.772C190.035 100.662 189.97 100.513 189.967 100.356V21.6779C189.967 21.5192 190.03 21.3669 190.143 21.2547C190.255 21.1425 190.407 21.0795 190.566 21.0795H204.329C204.486 21.0824 204.635 21.1467 204.745 21.2586C204.855 21.3705 204.916 21.5211 204.916 21.6779V30.0997ZM221.179 67.3428C219.958 67.3814 218.73 67.2768 217.521 67.0265C214.479 66.397 211.694 64.8745 209.522 62.6536C207.35 60.4328 205.89 57.6146 205.329 54.5595C205.167 53.6817 205.082 52.7958 205.072 51.9114C205.061 50.9204 205.144 49.926 205.323 48.9415C205.879 45.8886 207.331 43.0704 209.495 40.8465C211.659 38.6226 214.436 37.094 217.473 36.4557C218.689 36.2001 219.924 36.0919 221.153 36.1288C223.15 36.1534 225.123 36.5679 226.962 37.3492C228.825 38.141 230.513 39.2939 231.929 40.7413C233.344 42.1887 234.459 43.902 235.209 45.7824C235.959 47.6628 236.329 49.6731 236.299 51.6974C236.299 51.6977 236.299 51.698 236.299 51.6983C236.331 53.7263 235.962 55.7408 235.214 57.626C234.465 59.5114 233.351 61.2304 231.937 62.6843C230.522 64.1382 228.834 65.2983 226.97 66.098C225.138 66.8837 223.171 67.3063 221.179 67.3428Z"
                  fill="#5A31F4"
                ></path>
                <path
                  d="M109.306 32.8701C105.904 25.7337 99.4543 21.1238 89.7359 21.1238C86.753 21.1758 83.8218 21.9123 81.1685 23.2765C78.5151 24.6406 76.2106 26.5959 74.4325 28.9916L74.0779 29.4238V1.45428C74.0779 1.29264 74.0137 1.13763 73.8994 1.02333C73.7851 0.909028 73.6301 0.844803 73.4684 0.844803H59.7275C59.5678 0.847707 59.4156 0.913196 59.3037 1.02718C59.1917 1.14117 59.1291 1.29454 59.1291 1.45428V81.6837C59.1291 81.8424 59.1921 81.9946 59.3044 82.1068C59.4166 82.219 59.5688 82.2821 59.7275 82.2821H74.4436C74.6033 82.2821 74.7567 82.2194 74.8707 82.1075C74.9847 81.9956 75.0502 81.8434 75.0531 81.6837V47.4754C75.0531 40.8265 79.4856 36.1169 86.5777 36.1169C94.3347 36.1169 96.2961 42.4998 96.2961 49.0046V81.6837C96.2961 81.8424 96.3592 81.9946 96.4714 82.1068C96.5836 82.219 96.7358 82.2821 96.8945 82.2821H111.577C111.737 82.2821 111.891 82.2194 112.004 82.1075C112.118 81.9956 112.184 81.8434 112.187 81.6837V47.0543C112.187 45.8686 112.187 44.705 112.032 43.5747C111.78 39.8707 110.856 36.2435 109.306 32.8701V32.8701Z"
                  fill="#5A31F4"
                ></path>
                <path
                  d="M35.8249 44.7604C35.8249 44.7604 28.3339 42.9985 25.5746 42.2893C22.8153 41.5801 17.9949 40.073 17.9949 36.4272C17.9949 32.7814 21.8845 31.6179 25.8295 31.6179C29.7745 31.6179 34.1627 32.5709 34.5062 36.948C34.5201 37.1058 34.5927 37.2525 34.7097 37.3593C34.8267 37.466 34.9795 37.5249 35.1379 37.5243L49.6434 37.4689C49.7288 37.4691 49.8133 37.4517 49.8916 37.4178C49.9699 37.3838 50.0404 37.3341 50.0987 37.2717C50.1569 37.2093 50.2017 37.1356 50.2301 37.0551C50.2585 36.9746 50.2701 36.8891 50.264 36.804C49.3664 22.7971 37.0771 17.7883 25.7408 17.7883C12.2991 17.7883 2.46987 26.6534 2.46987 36.4272C2.46987 43.5636 4.48669 50.2568 20.3442 54.911C23.1256 55.7199 26.9044 56.7727 30.2066 57.6924C34.1738 58.8006 36.3125 60.4739 36.3125 63.1112C36.3125 66.1697 31.8799 68.2973 27.5249 68.2973C21.2196 68.2973 16.7427 65.9592 16.377 61.7593C16.358 61.6056 16.2832 61.4642 16.1667 61.362C16.0502 61.2599 15.9003 61.2041 15.7454 61.2052L1.27307 61.2717C1.18823 61.2717 1.10425 61.2887 1.02614 61.3218C0.94802 61.355 0.877379 61.4035 0.818427 61.4645C0.759474 61.5255 0.713411 61.5978 0.683003 61.677C0.652596 61.7562 0.638464 61.8407 0.641441 61.9255C1.30633 75.1456 14.0721 82.271 25.9735 82.271C43.7038 82.271 51.7156 72.2977 51.7156 62.9561C51.7378 58.5679 50.7294 48.5724 35.8249 44.7604Z"
                  fill="#5A31F4"
                ></path>
                <path
                  d="M146.384 17.6442C132.654 17.6442 125.806 22.3095 120.31 26.0439L120.143 26.1547C119.86 26.3488 119.66 26.6427 119.584 26.9775C119.508 27.3124 119.562 27.6637 119.733 27.961L125.163 37.3137C125.265 37.4887 125.404 37.6391 125.571 37.754C125.738 37.869 125.928 37.9457 126.127 37.9786C126.323 38.0139 126.523 38.0053 126.715 37.9536C126.907 37.9018 127.084 37.8082 127.235 37.6794L127.668 37.3248C130.493 34.9534 135.026 31.7841 145.996 30.9197C152.102 30.4322 157.377 32.0279 161.266 35.6626C165.544 39.6076 168.104 45.9794 168.104 52.7058C168.104 65.0837 160.812 72.8629 149.099 73.018C139.447 72.9626 132.965 67.9317 132.965 60.496C132.965 56.5511 134.749 53.9802 138.228 51.4093C138.494 51.2193 138.682 50.9395 138.757 50.6217C138.832 50.304 138.79 49.9696 138.638 49.6806L133.762 40.4608C133.672 40.2958 133.551 40.1502 133.404 40.0323C133.258 39.9144 133.089 39.8266 132.909 39.7738C132.725 39.7188 132.531 39.7033 132.34 39.7281C132.149 39.7529 131.965 39.8176 131.801 39.9179C126.327 43.1647 119.611 49.1043 119.977 60.5182C120.42 75.0459 132.499 86.1384 148.201 86.5927H148.988H150.063C168.724 85.9833 182.199 72.1315 182.199 53.3485C182.199 36.1059 169.633 17.6442 146.384 17.6442Z"
                  fill="#5A31F4"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M282.375 1.04428H408.027C416.699 1.04428 423.73 8.07446 423.73 16.7466V85.54C423.73 94.2121 416.699 101.242 408.027 101.242H282.375C273.703 101.242 266.673 94.2121 266.673 85.54V16.7466C266.673 8.07446 273.703 1.04428 282.375 1.04428ZM310.566 55.5316C321.049 55.5316 328.551 47.8854 328.551 37.1697C328.551 26.5093 321.049 18.8188 310.566 18.8188H292.06C291.84 18.8188 291.628 18.9064 291.473 19.0623C291.317 19.2181 291.229 19.4295 291.229 19.65V70.4361C291.232 70.6556 291.32 70.8653 291.476 71.0206C291.631 71.1758 291.841 71.2643 292.06 71.2672H299.019C299.24 71.2672 299.451 71.1796 299.607 71.0237C299.763 70.8679 299.85 70.6565 299.85 70.4361V56.3627C299.85 56.1423 299.938 55.9309 300.094 55.775C300.25 55.6191 300.461 55.5316 300.682 55.5316H310.566ZM310.034 26.5315C315.73 26.5315 319.93 31.0306 319.93 37.1697C319.93 43.3198 315.73 47.8078 310.034 47.8078H300.682C300.463 47.8078 300.253 47.7218 300.098 47.5683C299.942 47.4149 299.853 47.2063 299.85 46.9878V27.3626C299.853 27.1431 299.942 26.9334 300.097 26.7781C300.252 26.6229 300.462 26.5344 300.682 26.5315H310.034ZM330.601 61.5266C330.529 59.8838 330.868 58.2489 331.588 56.7704C332.308 55.2919 333.386 54.0167 334.724 53.0604C337.428 51.0325 341.616 49.9798 347.833 49.736L354.426 49.5144V47.564C354.426 43.6745 351.811 42.0233 347.611 42.0233C343.412 42.0233 340.763 43.5082 340.143 45.9351C340.093 46.1065 339.988 46.2564 339.843 46.3609C339.698 46.4653 339.523 46.5183 339.345 46.5113H332.84C332.72 46.5143 332.601 46.491 332.492 46.4431C332.382 46.3952 332.284 46.3238 332.205 46.2341C332.126 46.1443 332.067 46.0383 332.033 45.9235C331.999 45.8086 331.991 45.6878 332.009 45.5694C332.984 39.807 337.749 35.4299 347.911 35.4299C358.704 35.4299 362.593 40.4498 362.593 50.0352V70.4028C362.595 70.5129 362.575 70.6221 362.533 70.7243C362.492 70.8264 362.431 70.9193 362.354 70.9977C362.277 71.076 362.185 71.1382 362.083 71.1807C361.981 71.2232 361.872 71.245 361.762 71.245H355.191C355.081 71.245 354.972 71.2232 354.87 71.1807C354.769 71.1382 354.677 71.076 354.599 70.9977C354.522 70.9193 354.461 70.8264 354.42 70.7243C354.379 70.6221 354.358 70.5129 354.36 70.4028V68.8846C354.371 68.7514 354.339 68.6183 354.268 68.5049C354.197 68.3915 354.092 68.3041 353.967 68.2555C353.842 68.207 353.706 68.1999 353.577 68.2354C353.448 68.2709 353.334 68.347 353.252 68.4525C351.29 70.5912 348.099 72.1426 343.013 72.1426C335.555 72.1647 330.601 68.2641 330.601 61.5266ZM354.426 57.094V55.5205L345.894 55.9637C341.395 56.1964 338.768 58.0692 338.768 61.2163C338.768 64.0643 341.173 65.6489 345.362 65.6489C351.058 65.6489 354.426 62.5682 354.426 57.1051V57.094ZM369.198 80.7196V86.6481C369.188 86.8397 369.242 87.0293 369.353 87.1861C369.463 87.3429 369.623 87.4579 369.807 87.5124C370.966 87.8283 372.164 87.9739 373.365 87.9446C379.736 87.9446 385.554 85.6175 388.879 76.553L403.506 37.5353C403.548 37.4097 403.559 37.276 403.54 37.1451C403.52 37.0142 403.47 36.8897 403.394 36.7817C403.317 36.6738 403.216 36.5854 403.099 36.5238C402.982 36.4622 402.852 36.4291 402.719 36.4272H395.904C395.727 36.4257 395.554 36.4809 395.411 36.5845C395.267 36.6882 395.161 36.8349 395.106 37.0034L387.05 61.7149C386.989 61.8769 386.879 62.0163 386.737 62.1147C386.594 62.2131 386.425 62.2658 386.252 62.2658C386.079 62.2658 385.91 62.2131 385.767 62.1147C385.625 62.0163 385.516 61.8769 385.454 61.7149L376.168 36.9369C376.106 36.7782 375.998 36.6417 375.858 36.5449C375.718 36.4481 375.552 36.3956 375.381 36.394H368.732C368.6 36.3959 368.47 36.429 368.353 36.4906C368.236 36.5522 368.135 36.6406 368.058 36.7485C367.981 36.8564 367.931 36.9809 367.912 37.1119C367.892 37.2428 367.904 37.3765 367.946 37.5021L381.62 72.6301C381.687 72.8126 381.687 73.0129 381.62 73.1953L381.188 74.5583C380.684 76.2492 379.627 77.722 378.186 78.7407C376.746 79.7593 375.005 80.265 373.243 80.1766C372.22 80.1755 371.2 80.079 370.195 79.8885C370.073 79.8656 369.948 79.87 369.828 79.9012C369.708 79.9325 369.596 79.9898 369.501 80.0692C369.406 80.1486 369.329 80.2481 369.277 80.3605C369.224 80.4729 369.197 80.5956 369.198 80.7196Z"
                  fill="#5A31F4"
                ></path>
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
            className={`${
              isMailFocus ? "border-black" : "border-listBorder"
            } border-2 p-3 rounded-md promoCode`}
            tabIndex={0}
            style={{ transition: "border-color .25s ease" }}
            onFocus={handleMailFocus}
            onBlur={handleMailBlur}
          >
            <input
              type="text"
              placeholder="Email or mobile phone number"
              ref={emailRef}
            />
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

        <section className="px-6 mt-8">
          <h4 className="text-black">Delivery</h4>
          <div
            className={`relative mt-4 border border-listBorder rounded-md p-3`}
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
              className={`${
                isFirstNameFocus ? "border-black" : "border-listBorder"
              } border-2 p-3 rounded-md promoCode`}
              tabIndex={0}
              style={{ transition: "border-color .25s ease" }}
              onFocus={handleFirstNameFocus}
              onBlur={handleFirstNameBlur}
            >
              <input type="text" placeholder="First name" ref={firstNameRef} />
            </div>
          </div>
          <div className="my-4 w-full">
            <div
              className={`${
                isLastNameFocus ? "border-black" : "border-listBorder"
              } border-2 p-3 rounded-md promoCode`}
              tabIndex={0}
              style={{ transition: "border-color .25s ease" }}
              onFocus={handleLastNameFocus}
              onBlur={handleLastNameBlur}
            >
              <input type="text" placeholder="Last name" ref={lastNameRef} />
            </div>
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
