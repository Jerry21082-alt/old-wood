"use client";

import AspectRatioContainer from "@/components/AspectRatioContainer";
import Drawer from "@/components/Drawer";
import ProductReel from "@/components/ProductReel";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { toggleAgree } from "@/features/checkout/checkoutSlice";

import { formatPrice } from "@/helpers/formatPrice";
import { addToCart } from "@/features/cart/cartSlice";
import { toggleOverlay } from "@/features/navigation/navigationSlice";
import { toggleCart } from "@/features/navigation/navigationSlice";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { delay } from "@/helpers/delay";
import { animateElementOnView } from "@/helpers/animateElementOnView";
import { addClass } from "@/helpers/addClass";

export default function Product_Page({ params }) {
  const { id } = params;
  const [productId] = id;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [startX, setStartX] = useState(0);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [terms, setTerms] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [pairs, setPairs] = useState([]);

  const agree = useSelector((state) => state.checkout.agree);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData(pairLimit = 8) {
      try {
        const res = await fetch(
          `/api/itemCategory?id=${productId}&pairLimit=${pairLimit}`
        );

        const data = await res.json();
        setPairs(data.itemCategory);
        setItem(data.item);
      } catch (error) {
        console.log("An error occurred, please try again!", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setReveal(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const dom = {
        collapseBtn: document?.querySelectorAll(".collapse--btn"),
        collapseDiv: document?.querySelectorAll(".collapseable"),
        collapseVisibleText: document?.querySelector(".collapse-visible_text"),
      };

      const { collapseBtn, collapseDiv, collapseVisibleText } = dom;

      const toggleHeight = (element) => {
        if (!element) return;
        if (element.style.height === "0px" || !element.style.height) {
          element.style.height = `${element.scrollHeight}px`;
        } else {
          element.style.height = "0px";
        }
      };

      const handleClick = (idx) => {
        collapseDiv[idx].classList.toggle("not-collapse");
        collapseVisibleText.classList.toggle("hide");
        toggleHeight(collapseDiv[idx]);
      };

      collapseBtn.forEach((btn, idx) => {
        btn.addEventListener("click", () => handleClick(idx));
      });

      return () => {
        collapseBtn.forEach((btn, index) =>
          btn.removeEventListener("click", () => handleClick(index))
        );
      };
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const methodGrid = document.querySelector(".method-grid");
      const methodImg = document.querySelector(".method--img");

      if (!methodGrid || !methodImg) {
        console.warn("Required DOM element not found!");
        return;
      }

      animateElementOnView(methodGrid, addClass, 0.1, methodImg, "reveal");
    }
  }, [isLoading]);

  const handleIncrement = () => {
    setItem((prevItem) => ({ ...item, quantity: prevItem.quantity + 1 }));
  };

  const handleDecrement = () => {
    setItem((prevItem) => {
      if (prevItem.quantity - 1 < 1) return { ...prevItem, quantity: 1 };
      return { ...prevItem, quantity: prevItem.quantity - 1 };
    });
  };

  const addItemToCart = async (newProduct) => {
    if (!agree) {
      console.log("please agree to terms");
      setIsChecked(true);
    } else {
      setIsAddingToCart(true);
      await delay(2000);
      dispatch(addToCart(newProduct));
      dispatch(toggleCart());
      dispatch(toggleAgree());
      setIsAddingToCart(false);
    }
  };

  const hideTerms = () => {
    setTerms(false);
    dispatch(toggleOverlay());
  };

  const handleToggleAgree = () => {
    setIsChecked(false);
    dispatch(toggleAgree());
    dispatch(toggleOverlay());
    setTerms((prev) => !prev);
  };

  let touchStartX = 0;
  let touchEndX = 0;

  const handleSwipeStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleSwipeMove = (e) => {
    touchEndX = e.changedTouches[0].screenX;
  };

  const handleTouchDifference = () => {
    if (touchEndX < touchStartX) {
      setSwipeIndex((prevIndex) => prevIndex - 1);
    } else {
      if (touchEndX > touchStartX) {
        setSwipeIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const showSlide = (idx) => {
    const totalSlides = item.allImages.length;
    if (idx >= totalSlides) {
      return;
    } else if (idx < 0) {
      return;
    } else {
      setCurrentIndex(idx);
    }
  };

  const handleNext = () => showSlide(currentIndex + 1);
  const handlePrev = () => showSlide(currentIndex - 1);

  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleTouchMove = (event) => {
    if (!isDragging) return;

    const currentX = event.touches[0].clientX;
    const diffX = startX - currentX;

    if (diffX > 50) {
      handleNext();
      setIsDragging(false);
    } else if (diffX < -50) {
      handlePrev();
      setIsDragging(false);
    }
  };

  const handleSelect = (index) => {
    setCurrentIndex(index);
  };

  const container = "w-full max-w-[1600px] ml-auto px-10";

  if (isLoading) {
    return (
      <div>
        <LoadingSkeleton></LoadingSkeleton>
      </div>
    );
  }

  return (
    <section style={{ marginTop: "65.5px" }}>
      <div className={container}>
        <div
          className="grid gap-10 pt-10 mx-0 justify-between items-start"
          style={{ gridTemplateColumns: "50% 50%" }}
        >
          <div className="relative w-full block">
            <div className="relative mx-auto">
              <div className="block min-w-full text-center">
                {item.allImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="pointer-events-none mb-10 min-w-full text-center block"
                  >
                    <div
                      className="overflow-hidden bg-milk z-0 pb-0 relative block mx-auto"
                      style={{ aspectRatio: 0.75 }}
                    >
                      <img
                        src={img.src}
                        srcSet={img.srcSet}
                        alt={item.name}
                        loading="lazy"
                        className="relative top-0 left-0 object-cover object-center max-w-full w-auto h-full "
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="p-20 sticky top-0"
            style={{ width: "calc(100% - 40px)", left: "calc(50% + 40px)" }}
          >
            <div className="pb-[30px] m-0 border-b border-[#A5A097]">
              <h1 className="mb-6 h2 text-4xl text-lightBrown">
                The Bromley Ottoman
              </h1>
              <div className="text-[15px] mb-[6px] block text-lightBrown italic">
                New Vintage
              </div>
            </div>
            <div className="grid" style={{ rowGap: "16px" }}>
              <div className="relative border-b border-[#A5A097]">
                <button className="appearance-none px-0 transition-all flex flex-wrap py-[18px] items-center justify-between text-sm overflow-visible cursor-pointer w-full text-lightBrown collapse--btn">
                  Description
                  <span className="plus-icon relative"></span>
                  <p
                    className="block max-w-[90%] transition-all w-full text-left normal-case h-auto relative mb-0 mt-4 text-shadow collapse-visible_text"
                    style={{
                      letterSpacing: 0,
                      transitionDuration: "0.4s ease-in-out",
                    }}
                  >
                    {item.description?.length > 100
                      ? `${item?.description.substring(0, 100)}...`
                      : item?.description}
                  </p>
                </button>

                <div
                  className="h-0 block collapseable"
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-0 transition-all pb-[26px]">
                    <div className="my-0">
                      <span>{item?.description}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[-13px] relative border-b border-[#A5A097]">
                <button className="appearance-none px-0 transition-all flex flex-wrap py-[18px] items-center justify-between text-sm overflow-visible cursor-pointer w-full text-lightBrown collapse--btn">
                  Dimensions
                  <span className="plus-icon relative"></span>
                </button>
                <div
                  className="h-0 block collapseable"
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-0 transition-all pb-[26px]">
                    <div className="my-0">
                      <span>
                        Brutalist and soft. Our take on a staple ottoman adapted
                        with a chunky square body. Meant to be partnered, yet
                        strong enough to stand alone.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="grid relative pt-[95px] gap-[15px]"
                style={{ gridTemplateColumns: "100%" }}
              >
                <div>
                  <form>
                    <div className="absolute top-0 left-0 w-full">
                      <div className="m-0 p-0">
                        <div className="flex items-center mt-[10px] text-lightBrown text-[16px]">
                          <div>
                            <span className="text-lightBrown text-[16px]">
                              {`$${formatPrice(item.price, 2)}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="absolute w-full bottom-[-160px] text-[13px]">
                        <div>
                          <p className="w-full block">
                            <span className="pr-[4px] text-[13px]">
                              From <b>$972.54</b>/month
                            </span>
                            <div className="inline-flex">
                              <svg
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 341 81"
                                fill="none"
                                className="h-[14px] w-[56px] mt-[1px] overflow-hidden"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M227.297 0C220.448 0 214.896 5.47237 214.896 12.2229V67.8125C214.896 74.563 220.448 80.0354 227.297 80.0354H328.357C335.206 80.0354 340.758 74.563 340.758 67.8125V12.2229C340.758 5.47237 335.206 0 328.357 0H227.297ZM244.999 55.8917V41.8012H253.993C262.21 41.8012 266.579 37.2604 266.579 30.379C266.579 23.4976 262.21 19.3782 253.993 19.3782H239.205V55.8917H244.999ZM244.999 24.8084H252.663C257.982 24.8084 260.595 26.9617 260.595 30.5663C260.595 34.1708 258.077 36.3242 252.9 36.3242H244.999V24.8084ZM276.795 56.6407C281.212 56.6407 284.109 54.7214 285.439 51.4445C285.819 55.0959 288.052 56.9684 292.896 55.7044L292.944 51.819C290.996 52.0063 290.616 51.3041 290.616 49.2912V39.7415C290.616 34.124 286.864 30.8003 279.93 30.8003C273.09 30.8003 269.148 34.1708 269.148 39.8819H274.468C274.468 37.1668 276.415 35.5284 279.835 35.5284C283.444 35.5284 285.107 37.0732 285.059 39.7415V40.9586L278.932 41.614C272.045 42.3629 268.246 44.9376 268.246 49.4316C268.246 53.1298 270.905 56.6407 276.795 56.6407ZM277.982 52.4276C274.99 52.4276 273.803 50.836 273.803 49.2443C273.803 47.091 276.273 46.1079 281.117 45.5462L284.917 45.1249C284.679 49.2443 281.877 52.4276 277.982 52.4276ZM310.537 57.7174C308.115 63.5221 304.22 65.2541 298.141 65.2541H295.528V60.4793H298.331C301.655 60.4793 303.27 59.4494 305.028 56.5002L294.246 31.5493H300.23L307.925 49.7593L314.764 31.5493H320.606L310.537 57.7174Z"
                                  fill="rgb(90, 49, 244)"
                                ></path>
                                <path
                                  d="M29.5136 35.1798C21.5797 33.4835 18.0451 32.8197 18.0451 29.8064C18.0451 26.9722 20.4371 25.5604 25.221 25.5604C29.4282 25.5604 32.5036 27.3726 34.7674 30.9232C34.9382 31.1972 35.2906 31.292 35.5789 31.1445L44.506 26.6983C44.8263 26.5402 44.9438 26.1399 44.7623 25.8343C41.0569 19.5022 34.2121 16.0358 25.1996 16.0358C13.3574 16.0358 6 21.7885 6 30.9338C6 40.648 14.9591 43.1029 22.9038 44.7992C30.8484 46.4955 34.3936 47.1592 34.3936 50.1725C34.3936 53.1858 31.8095 54.6082 26.6518 54.6082C21.8893 54.6082 18.3548 52.4589 16.2191 48.2866C16.059 47.981 15.6852 47.8546 15.3756 48.0127L6.46985 52.364C6.16017 52.5221 6.03203 52.8908 6.19221 53.2069C9.72673 60.2134 16.9773 64.1538 26.6625 64.1538C38.996 64.1538 46.4494 58.496 46.4494 49.0663C46.4494 39.6365 37.4476 36.8972 29.5136 35.2009V35.1798Z"
                                  fill="rgb(90, 49, 244)"
                                ></path>
                                <path
                                  d="M77.3525 16.0358C72.291 16.0358 67.8168 17.8059 64.6026 20.9561C64.3997 21.1458 64.0687 21.0088 64.0687 20.7349V0.621625C64.0687 0.273937 63.791 0 63.4387 0H52.2692C51.9168 0 51.6391 0.273937 51.6391 0.621625V63.0476C51.6391 63.3952 51.9168 63.6692 52.2692 63.6692H63.4387C63.791 63.6692 64.0687 63.3952 64.0687 63.0476V35.6644C64.0687 30.3754 68.1798 26.319 73.7219 26.319C79.2639 26.319 83.279 30.2911 83.279 35.6644V63.0476C83.279 63.3952 83.5566 63.6692 83.909 63.6692H95.0785C95.4309 63.6692 95.7085 63.3952 95.7085 63.0476V35.6644C95.7085 24.1591 88.0628 16.0464 77.3525 16.0464V16.0358Z"
                                  fill="rgb(90, 49, 244)"
                                ></path>
                                <path
                                  d="M118.389 14.2552C112.324 14.2552 106.622 16.0779 102.542 18.7224C102.265 18.9016 102.169 19.2703 102.34 19.5548L107.262 27.8466C107.444 28.1416 107.828 28.247 108.127 28.0679C111.224 26.2241 114.769 25.2653 118.389 25.2864C128.138 25.2864 135.303 32.0716 135.303 41.0377C135.303 48.6763 129.569 54.3342 122.297 54.3342C116.371 54.3342 112.26 50.9311 112.26 46.1266C112.26 43.3767 113.445 41.122 116.531 39.5311C116.851 39.3625 116.969 38.9727 116.777 38.6671L112.132 30.9126C111.982 30.6598 111.662 30.5439 111.373 30.6492C105.148 32.925 100.78 38.4037 100.78 45.7579C100.78 56.8839 109.761 65.1863 122.287 65.1863C136.916 65.1863 147.434 55.1876 147.434 40.8481C147.434 25.476 135.197 14.2446 118.368 14.2446L118.389 14.2552Z"
                                  fill="rgb(90, 49, 244)"
                                ></path>
                                <path
                                  d="M180.098 15.9515C174.449 15.9515 169.409 18.006 165.725 21.6304C165.522 21.8306 165.191 21.6831 165.191 21.4092V17.0473C165.191 16.6996 164.914 16.4256 164.561 16.4256H153.68C153.328 16.4256 153.05 16.6996 153.05 17.0473V79.3784C153.05 79.7261 153.328 80 153.68 80H164.849C165.202 80 165.48 79.7261 165.48 79.3784V58.9385C165.48 58.6645 165.811 58.5276 166.013 58.7067C169.687 62.0782 174.545 64.0485 180.109 64.0485C193.211 64.0485 203.43 53.5862 203.43 39.9947C203.43 26.4032 193.2 15.941 180.109 15.941L180.098 15.9515ZM177.995 53.4914C170.541 53.4914 164.892 47.6439 164.892 39.9104C164.892 32.177 170.53 26.3295 177.995 26.3295C185.459 26.3295 191.086 32.0822 191.086 39.9104C191.086 47.7387 185.533 53.4914 177.984 53.4914H177.995Z"
                                  fill="rgb(90, 49, 244)"
                                ></path>
                              </svg>
                            </div>

                            <span
                              className="inline-flex flex-nowrap w-fit min-w-max items-center pl-[4px]"
                              style={{ columnGap: "4px" }}
                            >
                              <button className="inline-block cursor-pointer underline text-xs normal-case">
                                Check your purchasing power
                              </button>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <label
                      id="termsCheck"
                      className="absolute top-[50px] left-0 grid items-center cursor-pointer gap-[10px]"
                      style={{ gridTemplateColumns: "17px auto" }}
                    >
                      <input
                        type="checkbox"
                        className="appearance-none rounded-full border border-shadow h-4 w-4 mt-[4px] cursor-pointer text-left text-lightBrown"
                      />
                      <span>
                        I agree to the New Vintage terms and conditions
                      </span>
                    </label>

                    <div className="grid gap-[10px]">
                      <button className="px-[35px] text-[13px] whitespace-nowrap h-auto w-full bg-lightBrown text-milk relative inline-block overflow-visible no-underline cursor-pointer touch-manipulation appearance-none leading-[45px]">
                        <span
                          className="flex items-center justify-center whitespace-nowrap"
                          style={{ letterSpacing: "1.3px" }}
                        >
                          Add to cart
                        </span>
                        <span className="loader-button">
                          <div className="spinner"></div>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-20 py-10">
        <div className="max-w-[1600px] px-6 md:px-10 w-full">
          <header className="max-w-full mb-[30xp] text-left">
            <div>
              <h3 className="mt-12 mb-6 text-[34px] text-lightBrown h2">
                Pairs With
              </h3>
            </div>
          </header>
          <ProductReel products={pairs} />
        </div>
        <div className="my-7">
          <div className="px-6 md: md:px-10 w-full">
            <div className="px-6 md:px-10 bg-milk">
              <div className="method-grid">
                <div className="w-full relative overflow-hidden">
                  <img
                    src="//roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=1400"
                    srcSet="//roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=600 600w, //roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=700 700w, //roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=800 800w, //roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=1000 1000w, //roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=1200 1200w, //roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=1400 1400w"
                    alt="product image"
                    className="block relative w-full h-auto max-w-full method--img"
                  />
                </div>

                <div className="py-6">
                  <div className="flex flex-wrap">
                    <div className="shrink-0 w-full">
                      <div className="h2 mb-7">
                        <div>
                          <span className="block text-4xl md:text-5xl text-lightBrown">
                            The Roweam
                          </span>
                          <span className="block text-4xl md:text-5xl text-lightBrown">
                            Method
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>
                      We believe in the storytelling power of one-of-a-kind
                      pieces that are made to age through generation. Our custom
                      products do just that. All material options are tried and
                      true favorites that patina perfectly. So we welcome the
                      sun and play, sleep and stain--our furniture is meant for
                      fully lived life.
                    </p>

                    <div className="mt-8">
                      <Link
                        href="/"
                        className="relative text-lightBrown detail-link uppercase text-sm"
                      >
                        learn more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Terms = ({ hideTerms }) => {
  return (
    <div className="h-[90vh] py-[7.5%] px-[5%] overflow-y-auto max-w-[600px] m-6 bg-milk fixed top-0 left-0 z-40">
      <h5 className="uppercase text-sm">New Vintage Terms and Conditions</h5>
      <p className="mt-4">
        All Oldwood™ New Vintage items are made to order and custom, therefore
        they are ineligible for returns or exchanges. Please note that all lead
        times are estimated and subject to change. If a multiple item custom
        order is placed, items will ship when all custom pieces are complete.
        Dye lots and color variations on fabric and finishes are subject to a
        10% variation, as our stains are hand applied and fabrics vary per bolt.
        If you are interested in seeing the finishes in person, please email
        trade@oldwood.com for samples. Buyer is responsible for properly
        measuring your point of entry and intended furniture location to ensure
        a true fit. If an order must be canceled immediately after placement, we
        allow for a 24 hour grace period to contact us at hello@roweam.com to
        cancel your order. Our teams personally inspect all items as they
        prepare to ship to ensure the finest quality. It is the responsibility
        of the buyer to inspect their custom new vintage pieces upon receipt to
        notice of any damage incurred during transit. Roweam™ is not responsible
        for any damages incurred after items leave our manufacturer. Please
        notate any signs of transit damage and contact us immediately at
        hello@oldwood.com so that we may file claims with the responsible
        carrier. Roweam™ will honor any damages determined to be a manufacturing
        issue. If any manufacturing damages are found, please contact us
        immediately.
      </p>

      <button
        type="button"
        onClick={hideTerms}
        className="mt-6 text-sm bg-lightBrown py-3 px-8 text-milk"
      >
        ACCEPT
      </button>
    </div>
  );
};
