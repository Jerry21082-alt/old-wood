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
import { delay } from "@/helpers";
import { toggleCart } from "@/features/navigation/navigationSlice";
import LoadingSkeleton from "@/components/LoadingSkeleton";

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
  const scrollRef = useRef(null);

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

  if (isLoading) {
    return (
      <div>
        <LoadingSkeleton></LoadingSkeleton>
      </div>
    );
  }

  return (
    <section className="mt-24">
      <div className="max-w-[1600px] w-full px-6 md:px-10">
        <div className="mt-6 mb-9 pt-6 block justify-between items-center md:grid product-thombnail">
          <div className="w-full">
            <AspectRatioContainer
              className="w-full overflow-hidden relative"
              aspectRatio={3 / 4}
            >
              <div
                className="flex w-full h-full relative"
                style={{
                  transform: `translateX(${-currentIndex * 100}%)`,
                  transition: "transform .5s ease-in-out",
                }}
                onTouchEnd={handleTouchEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
              >
                {isLoading ? (
                  <LoadingSkeleton></LoadingSkeleton>
                ) : (
                  item?.allImages.map((img, idx) => (
                    <div
                      className="min-w-full box-border flex items-center h-full"
                      key={idx}
                    >
                      <img
                        src={img.src}
                        srcSet={img.srcSet}
                        className="object-cover object-center w-full"
                        alt="product-image"
                        style={{
                          transform: reveal ? "scale(1)" : "scale(1.2)",
                          opacity: reveal ? "1" : "0",
                          transition: "transform .4s ease, opacity .4s ease",
                        }}
                      />
                    </div>
                  ))
                )}
              </div>
              <div
                className="absolute bottom-[10%] left-10 hidden md:block"
                onClick={handlePrev}
                style={{
                  visibility: currentIndex === 0 ? "hidden" : "visible",
                  opacity: currentIndex === 0 ? "0" : "1",
                  transition:
                    "visibility .25s ease-in-out, opacity .25s ease-in-out",
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center cursor-pointer active:scale-100 hover:scale-110 hover:fill-lightBrown"
                  style={{
                    transition:
                      "transform .25s ease-in-out, fill .25s ease-in-out",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 41 51.25"
                    x="0px"
                    y="0px"
                    width="74"
                    height="74"
                  >
                    <title>left-arrow</title>
                    <path d="M20.5 2.293c-10.045 0-18.207 8.163-18.207 18.207 0 10.044 8.163 18.207 18.207 18.207 10.044 0 18.207-8.163 18.207-18.207s-8.163-18.207-18.207-18.207zM20.5 2.999c9.645 0 17.501 7.856 17.501 17.501s-7.856 17.501-17.501 17.501c-9.645 0-17.501-7.856-17.501-17.501s7.856-17.501 17.501-17.501zM17.622 14.862c-0.088 0-0.176 0.032-0.249 0.105l-5.281 5.281c-0.147 0.147-0.147 0.35 0 0.496l5.274 5.287c0.076 0.076 0.155 0.105 0.252 0.105s0.18-0.031 0.254-0.105c0.147-0.147 0.147-0.35 0-0.496l-4.679-4.679h15.471c0.206 0 0.357-0.151 0.357-0.357s-0.151-0.357-0.357-0.357h-15.471l4.679-4.679c0.147-0.147 0.147-0.35 0-0.496-0.073-0.073-0.161-0.105-0.249-0.105z" />
                  </svg>
                </div>
              </div>
              <div
                className="absolute bottom-[10%] right-10 hidden md:block"
                onClick={handleNext}
                style={{
                  visibility:
                    currentIndex === item.allImages.length - 1
                      ? "hidden"
                      : "visible",
                  opacity:
                    currentIndex === item.allImages.length - 1 ? "0" : "1",
                  transition:
                    "visibility .25s ease-in-out, opacity .25s ease-in-out",
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center cursor-pointer active:scale-100 hover:scale-110 hover:fill-lightBrown"
                  style={{
                    transition:
                      "transform .25s ease-in-out, fill .25s ease-in-out",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 41 51.25"
                    x="0px"
                    y="0px"
                    width="74"
                    height="74"
                  >
                    <title>right-arrow</title>
                    <path d="M20.5 2.293c-10.045 0-18.207 8.163-18.207 18.207s8.163 18.207 18.207 18.207c10.044 0 18.207-8.163 18.207-18.207s-8.163-18.207-18.207-18.207zM20.5 2.999c9.645 0 17.501 7.856 17.501 17.501s-7.856 17.501-17.501 17.501c-9.645 0-17.501-7.856-17.501-17.501s7.856-17.501 17.501-17.501zM23.385 14.869c-0.088 0-0.176 0.032-0.249 0.105-0.147 0.147-0.147 0.35 0 0.496l4.679 4.679h-15.478c-0.206 0-0.357 0.151-0.357 0.357s0.146 0.35 0.357 0.35h15.471l-4.679 4.679c-0.147 0.147-0.147 0.35 0 0.496 0.074 0.074 0.157 0.105 0.254 0.105s0.176-0.030 0.252-0.105l5.281-5.281c0.147-0.147 0.147-0.35 0-0.496l-5.281-5.281c-0.073-0.073-0.161-0.105-0.249-0.105z" />
                  </svg>
                </div>
              </div>
            </AspectRatioContainer>
            <div className="w-full flex md:hidden items-center justify-center mt-4">
              {item.allImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="rounded-full h-3 w-3 ml-3"
                  style={{
                    backgroundColor:
                      currentIndex === idx ? "#221f20" : "#a5a097",
                    transition: "background-color .4s ease-in-out",
                  }}
                  // onClick={() => handleSlideClick(idx)}
                ></button>
              ))}
            </div>
          </div>

          <div className="mt-7 md:mt-0 p-0 md:p-20 w-full">
            <div className="my-7">
              <h1 className="h4 text-2xl md:text-4xl lg:text-5xl my-2">
                Sabi Sectional
              </h1>
              <div className="text-lightBrown text-sm md:text-lg lg:text-xl h3">
                {item.type}
              </div>
            </div>

            <div className="w-full">
              <div className="border-darkGray border-t w-full">
                <Drawer
                  color="#221f20"
                  borderColor="#A5A097"
                  title="Description"
                >
                  <div
                    className="pb-6 transition-all"
                    style={{ transitionDuration: ".25s ease" }}
                  >
                    <div>
                      <p className="text-sm md:text-md lg:text-lg">
                        {item?.description ? item.description : ""}
                      </p>
                    </div>
                  </div>
                </Drawer>
              </div>

              <div className="border-darkGray w-full">
                <Drawer color="#221f20" borderColor="#A5A097" title="Dimension">
                  <div
                    className="pb-6 transition-all"
                    style={{ transitionDuration: ".25s ease" }}
                  >
                    <div>
                      <p className="text-sm md:text-md lg:text-lg">
                        <Link
                          href="/"
                          className="text-xs uppercase text-darkBrown shop-button relative"
                        >
                          Tearsheet
                        </Link>
                      </p>
                      <p className="my-6 text-darkGray text-sm">Overall</p>
                      <ul className="flex flex-col space-y-1 text-sm md:text-md lg:text-lg">
                        <li className="px-1 text-darkGray">
                          {`width: ${
                            item?.dimensions?.width
                              ? item.dimensions.width
                              : null
                          } in`}
                        </li>
                        <li className="px-1 text-darkGray">
                          {`Length: ${
                            item?.dimensions?.length
                              ? item.dimensions.length
                              : null
                          } in`}
                        </li>
                        <li className="px-1 text-darkGray">
                          {`Depth: ${
                            item.dimensions.depth ? item.dimensions.depth : null
                          } in`}
                        </li>
                        <li className="px-1 text-darkGray">
                          {`Height: ${item.dimensions.height} in`}
                        </li>
                        <li className="px-1 text-darkGray">
                          {`Seat Height: ${
                            item.dimensions.seatHeight
                              ? item.dimensions.seatHeight
                              : null
                          } in`}
                        </li>
                        <li className="px-1 text-darkGray">
                          {`Seat Depth: ${
                            item.dimensions.seatDepth
                              ? item.dimensions.seatDepth
                              : null
                          } in`}
                        </li>
                        <li className="px-1 text-darkGray">
                          {`Arm Height: ${
                            item.dimensions.armHeight
                              ? item.dimensions.armHeight
                              : null
                          } in`}
                        </li>
                      </ul>
                    </div>
                  </div>
                </Drawer>
              </div>

              <div>
                <Drawer color="#221f20" borderColor="#A5A097" title="Customize">
                  <div className="py-2">
                    <div>
                      <div className="w-full flex items-center mb-2">
                        <span className=" text-darkGray uppercase">fabric</span>
                        <span className="text-sm text-darkBrown ml-6">
                          Sand
                        </span>

                        <div className="ml-4">
                          <Link
                            href="/"
                            className=" text-sm text-darkBrown relative"
                          >
                            <span className="detail-link relative">
                              Details
                            </span>
                          </Link>
                        </div>

                        <div className="fabric-grid"></div>
                      </div>
                    </div>
                  </div>
                </Drawer>
              </div>

              <div className="mt-6">
                <span className="text-lightBrown text-[14px] md:text-lg lg:text-xl">
                  ${formatPrice(item.price)}
                </span>
              </div>

              <label id="termCheck" className="mt-4">
                <input
                  id="theTerms"
                  type="checkbox"
                  required
                  onClick={handleToggleAgree}
                  ischecked={agree ? "true" : "false"}
                />
                <span className="text-sm md:text-[16px] lg:text-lg max-w-full md:max-w-[300px]">
                  I agree to the New Vintage terms and conditions
                </span>
              </label>

              <div className="flex items-center w-full mt-2 relative">
                <div
                  className="absolute top-0 w-full"
                  style={{ visibility: !isChecked ? "hidden" : "visible" }}
                >
                  <div className="absolute -top-2 left-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 22h-24l12-20z" />
                    </svg>
                  </div>
                  <div className="absolute w-auto z-[10]">
                    <div className="bg-black text-snow text-sm p-2">
                      check this box
                    </div>
                  </div>
                </div>
                <div className="w-28 md:w-[30%] h-12 p-3 md:p-5 flex items-center border border-listBorder">
                  <div className="flex justify-between items-center w-full">
                    <button type="button" onClick={handleDecrement}>
                      <svg
                        focusable="false"
                        width="10"
                        height="2"
                        viewBox="0 0 10 2"
                        fill="#5e3519"
                      >
                        <path filter="#5e3519" d="M0 0h10v2H0z"></path>
                      </svg>
                    </button>

                    <span className="text-lightBrown text-sm md:text-lg lg:text-xl">
                      {item.quantity}
                    </span>

                    <button type="button" onClick={handleIncrement}>
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="#5e3519"
                      >
                        <title>plus</title>
                        <path d="M16 10c0 0.553-0.048 1-0.601 1h-4.399v4.399c0 0.552-0.447 0.601-1 0.601s-1-0.049-1-0.601v-4.399h-4.399c-0.552 0-0.601-0.447-0.601-1s0.049-1 0.601-1h4.399v-4.399c0-0.553 0.447-0.601 1-0.601s1 0.048 1 0.601v4.399h4.399c0.553 0 0.601 0.447 0.601 1z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex-1 ml-4 h-12">
                  <button
                    className="w-full uppercase py-3 px-3 bg-lightBrown text-milk relative"
                    type="button"
                    onClick={() => addItemToCart(item)}
                  >
                    <span
                      className="text-sm md:text-[14px] lg:text-[16px]"
                      style={{ opacity: isAddingToCart ? "0" : "1" }}
                    >
                      Add to cart
                    </span>
                    <span className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
                      <div
                        className={isAddingToCart ? "spinner" : ""}
                        style={{
                          opacity: !isAddingToCart ? "0" : "1",
                        }}
                      >
                        <svg
                          fill="#f3f1ea"
                          width="20px"
                          height="20px"
                          viewBox="0 0 1024 1024"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z" />
                        </svg>
                      </div>
                    </span>
                  </button>
                </div>
              </div>

              <div className="bg-milk p-5 text-sm mt-4 text-sm md:text-md lg:text-lg">
                <span>
                  Kindly allow 10-12 weeks lead time for production and
                  additional 2 weeks for shipping. Thank you.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flow-root mt-11 px-6">
        <header>
          <h3 className="capitalize h2 text-xl md:text-3xl lg:text-4xl border-t border-listBorder pt-7">
            More about this item
          </h3>
        </header>
      </div>

      <div className="px-6 w-full">
        <div
          className="mt-6 overflow-y-hidden overflow-x-auto select"
          ref={scrollRef}
        >
          <div className="min-w-full w-max">
            <div className="scroll-grid border-y border-listBorder">
              <button
                type="button"
                className="pr-7"
                onClick={() => handleSelect(1)}
              >
                <span
                  className="text-[12px] md:text-[14px] lg:text-[18px] uppercase"
                  style={{ color: swipeIndex === 1 ? "#5e35190" : null }}
                >
                  product care
                </span>
              </button>

              <button
                type="button"
                className="pr-7"
                onClick={() => handleSelect(0)}
              >
                <span
                  className="text-[12px] md:text-[14px] lg:text-[18px] uppercase"
                  style={{ color: swipeIndex === 0 ? "#5e35190" : null }}
                >
                  story
                </span>
              </button>

              <button type="button" onClick={() => handleSelect(2)}>
                <span
                  className="text-[12px] md:text-[14px] lg:text-[18px] uppercase"
                  style={{ color: swipeIndex === 2 ? "#5e35190" : null }}
                >
                  shipping & return
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative p-0 md:p-10"
        onTouchStart={handleSwipeStart}
        onTouchEnd={handleTouchDifference}
        onTouchMove={handleSwipeMove}
      >
        <div className="w-full px-6 md:px-10">
          <div
            className="pb-[30px] border-b border-listBorder block overflow-y-auto "
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            <div
              className="scroll-item-grid"
              // className="flex min-w-0 relative"
              style={{ alignItems: "start", justifyContent: "safe start" }}
            >
              <div
                className="w-full gap-6 md:gap-10 flex flex-wrap md:flex-nowrap items-center md:items-start flex-none overflow-hidden mr-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="flex-none w-full md:w-[50%] self-center">
                  <div
                    className="flex flex-wrap py-10 pr-10 pl-[3px]"
                    style={{ alignContent: "space-between" }}
                  >
                    <div>
                      <h5 className="uppercase text-sm md:text-md lg:text-lg pb-6">
                        Caring for this item
                      </h5>
                      <p className="text-sm md:text-md lg:text-lg">
                        You may use a steamer on medium to remove wrinkles. Do
                        not iron.
                      </p>
                      <p className="mt-6 text-sm md:text-md lg:text-lg">
                        Our fabrics are organic in nature which allows for
                        movement. If you find your tight back sofa is wrinkling,
                        a simple swipe of the hand and fabric tuck in the arm
                        will remove those lines. Our cushion internals will
                        settle and loosen over time. To keep them fresh, simply
                        fluff and pat to organize the contents.
                      </p>
                      <p className="mt-6 text-sm md:text-md lg:text-lg">
                        Remove stains immediately. If you must, use a damp cloth
                        to pat out the stain, do not rub. Never use harsh
                        chemicals to remove stains. For persistent stains,
                        contact a professional fabric cleaning company.
                      </p>
                      <p className="mt-6 text-sm md:text-md lg:text-lg">
                        It’s important to remember when purchasing items
                        upholstered in fabric with higher piles, variations in
                        texture will be highlighted. These fabrics are luxurious
                        and pile inconsistencies are not a flaw but should be
                        embraced. It is not uncommon for these fabrics to crush
                        and distort over time with use. We use these fabrics
                        often in our designs and cherish their unique qualities.
                      </p>
                      <p className="mt-6 text-sm md:text-md lg:text-lg">
                        To keep these fabrics looking young, it’s recommended to
                        use a velvet brush or vacuum with an upholstery
                        attachment to reorganize the pile as you desire.
                      </p>
                      <p className="mt-6 text-sm md:text-md lg:text-lg">
                        Do not steam or iron shearling.
                      </p>
                      <p className="mt-6 text-sm md:text-md lg:text-lg">
                        For small leather stains, use a leather cleaner and
                        microfiber cloth.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="min-h-full flex-none w-full md:w-[50%]">
                  <img
                    src="//roweam.com/cdn/shop/files/Roweam_Method_4825_Resize_for_Product_Care.jpg?v=1694798533&width=1000"
                    srcSet="//roweam.com/cdn/shop/files/Roweam_Method_4825_Resize_for_Product_Care.jpg?v=1694798533&width=400 400w, //roweam.com/cdn/shop/files/Roweam_Method_4825_Resize_for_Product_Care.jpg?v=1694798533&width=500 500w, //roweam.com/cdn/shop/files/Roweam_Method_4825_Resize_for_Product_Care.jpg?v=1694798533&width=600 600w, //roweam.com/cdn/shop/files/Roweam_Method_4825_Resize_for_Product_Care.jpg?v=1694798533&width=700 700w, //roweam.com/cdn/shop/files/Roweam_Method_4825_Resize_for_Product_Care.jpg?v=1694798533&width=800 800w, //roweam.com/cdn/shop/files/Roweam_Method_4825_Resize_for_Product_Care.jpg?v=1694798533&width=900 900w, //roweam.com/cdn/shop/files/Roweam_Method_4825_Resize_for_Product_Care.jpg?v=1694798533&width=1000 1000w"
                    alt="product image"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              </div>
              <div
                className="w-full gap-6 md:gap-10 flex flex-wrap md:flex-nowrap items-center md:items-start flex-none overflow-hidden mr-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="flex-none w-full md:w-[50%] self-center">
                  <div
                    className="flex flex-wrap py-10 pr-10 pl-[3px]"
                    style={{ alignContent: "space-between" }}
                  >
                    <div>
                      <h5 className="uppercase text-sm md:text-md lg:text-lg pb-6">
                        True vintage
                      </h5>
                      <p className="text-sm md:text-md lg:text-lg">
                        We offer domestic shipping to all 50 states using common
                        carrier. All orders will be fulfilled within 5-7
                        business days (excluding holidays). Please note that
                        shipping rates are calculated based on the weight of the
                        entire order.
                      </p>
                      <h5 className="text-sm md:text-md lg:text-lg uppercase my-6 block">
                        New Vintage
                      </h5>
                      <p className="text-sm md:text-md lg:text-lg">
                        We offer white-glove delivery within the contiguous 48
                        states. Shipping totals are based on the weight of the
                        entire order. Please allow 10 - 25 days upon completion
                        of production for your order to be scheduled for
                        delivery. You'll be contacted to schedule a delivery
                        date once your order is delivered to its final
                        inspection point. Measure furniture in the space and all
                        entry points to ensure piece will fit upon arrival.
                      </p>
                      <h5 className="text-sm md:text-md lg:text-lg my-6 block">
                        True Vintage - Oversized
                      </h5>
                      <p className="text-sm md:text-md lg:text-lg">
                        Due to the scale of the piece, please inquire with us at{" "}
                        <a href="/" target="_blank">
                          hello@oldwood.com
                        </a>{" "}
                        . We'll estimate white-glove delivery based on the
                        delivery location.
                      </p>
                      <h5 className="text-sm md:text-md lg:text-lg uppercase my-6">
                        Damaged or Missing Shipments
                      </h5>
                      <p className="text-sm md:text-md lg:text-lg">
                        In the event that your item arrives damaged or is lost
                        in transit please contact us at{" "}
                        <a href="/" target="_blank">
                          hello@oldwood.com
                        </a>{" "}
                        . Please inspect all shipments within 48hrs of delivery.
                      </p>
                      <p className="pt-6 text-sm md:text-md lg:text-lg">
                        <strong>
                          All Oldwood™ New & True Vintage items are ineligible
                          for returns or exchanges.
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="min-h-full flex-none w-full md:w-[50%]">
                  <img
                    src="//roweam.com/cdn/shop/files/Roweam_Method_4647_Shipping_Resize.jpg?v=1694798467&width=1000"
                    srcSet="//roweam.com/cdn/shop/files/Roweam_Method_4647_Shipping_Resize.jpg?v=1694798467&width=400 400w, //roweam.com/cdn/shop/files/Roweam_Method_4647_Shipping_Resize.jpg?v=1694798467&width=500 500w, //roweam.com/cdn/shop/files/Roweam_Method_4647_Shipping_Resize.jpg?v=1694798467&width=600 600w, //roweam.com/cdn/shop/files/Roweam_Method_4647_Shipping_Resize.jpg?v=1694798467&width=700 700w, //roweam.com/cdn/shop/files/Roweam_Method_4647_Shipping_Resize.jpg?v=1694798467&width=800 800w, //roweam.com/cdn/shop/files/Roweam_Method_4647_Shipping_Resize.jpg?v=1694798467&width=900 900w, //roweam.com/cdn/shop/files/Roweam_Method_4647_Shipping_Resize.jpg?v=1694798467&width=1000 1000w"
                    alt="product image"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              </div>
              <div
                className="w-full gap-6 md:gap-10 flex flex-wrap md:flex-nowrap items-center md:items-start flex-none overflow-hidden mr-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="flex-none w-full md:w-[50%] self-center">
                  <div
                    className="flex flex-wrap py-10 pr-10 pl-[3px]"
                    style={{ alignContent: "space-between" }}
                  >
                    <div>
                      <h5 className="uppercase text-sm md:text-md lg:text-lg pb-6">
                        new vintage
                      </h5>
                      <p className="text-sm md:text-md lg:text-lg">
                        Designs inspired by everyday life, our New Vintage items
                        are made for the home. Antique elements are paired with
                        luxurious interior upholstery and organic fabrics. Our
                        New Vintage pieces are made by hand from master
                        craftsmen and upholsterers with generations worth of
                        knowledge.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="min-h-full flex-none w-full md:w-[50%]">
                  <img
                    src="//roweam.com/cdn/shop/files/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg?v=1694967270&width=1400"
                    srcSet="//roweam.com/cdn/shop/files/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg?v=1694967270&width=400 400w, //roweam.com/cdn/shop/files/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg?v=1694967270&width=500 500w, //roweam.com/cdn/shop/files/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg?v=1694967270&width=600 600w, //roweam.com/cdn/shop/files/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg?v=1694967270&width=700 700w, //roweam.com/cdn/shop/files/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg?v=1694967270&width=800 800w, //roweam.com/cdn/shop/files/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg?v=1694967270&width=900 900w, //roweam.com/cdn/shop/files/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg?v=1694967270&width=1000 1000w, //roweam.com/cdn/shop/files/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg?v=1694967270&width=1100 1100w, //roweam.com/cdn/shop/files/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg?v=1694967270&width=1200 1200w, //roweam.com/cdn/shop/files/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg?v=1694967270&width=1300 1300w, //roweam.com/cdn/shop/files/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg?v=1694967270&width=1400 1400w"
                    alt="product image"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-7 px-6 w-full">
          <div className="flow-root">
            <header className="mb-7 max-w-full">
              <div>
                <h3 className="h2 text-xl md:text-3xl lg:text-4xl">
                  Pairs with
                </h3>
              </div>
            </header>
          </div>
        </div>
        <ProductReel products={pairs} />
      </div>

      <section className="my-7">
        <div className="px-6 md: md:px-10 w-full">
          <div className="px-6 md:px-10 bg-milk">
            <div className="method-grid">
              <div className="w-full relative overflow-hidden">
                <img
                  src="//roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=1400"
                  srcSet="//roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=600 600w, //roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=700 700w, //roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=800 800w, //roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=1000 1000w, //roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=1200 1200w, //roweam.com/cdn/shop/files/101031_Rare_Fritz_Hansen_Sofa_Table_2755_RESIZED_FOR_PDP_ROW_METHOD_8cabc6f8-3eeb-4e47-95ae-7b5932a5e9fd.jpg?v=1694971841&width=1400 1400w"
                  alt="product image"
                  className="z-10 block relative w-full h-auto max-w-full"
                />
              </div>

              <div className="py-6">
                <div className="flex flex-wrap">
                  <div className="shrink-0 w-full">
                    <div className="h2 mb-7">
                      <div>
                        <span className="block text-4xl md:text-5xl lg:text-6xl">
                          The Old Wood
                        </span>
                        <span className="block text-4xl md:text-5xl lg:text-6xl">
                          Method
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm md:text-md lg:text-lg">
                    We believe in the storytelling power of one-of-a-kind pieces
                    that are made to age through generation. Our custom products
                    do just that. All material options are tried and true
                    favorites that patina perfectly. So we welcome the sun and
                    play, sleep and stain--our furniture is meant for fully
                    lived life.
                  </p>

                  <div className="mt-8">
                    <Link
                      href="/"
                      className="relative text-lightBrown detail-link uppercase"
                    >
                      learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {terms ? <Terms hideTerms={hideTerms} /> : null}
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
