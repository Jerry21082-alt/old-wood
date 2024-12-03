"use client";

import ProductReel from "../components/ProductReel";
import NewsLetter from "@/components/NewsLetter";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { animateElementOnView } from "@/helpers/animateElementOnView";
import { addClass } from "@/helpers/addClass";
import ImgWithTextBlock from "@/components/ImgWithTextBlock";
import ImgWithTextWrapper from "@/components/ImgWithTextWrapper";
import SplitLines from "@/components/SplitLines";
import FadeText from "@/components/FadeText";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [vintageSelect, setVintageSelect] = useState(0);
  const [activeRList, setActiveRList] = useState(false);
  const toggleMobileMenu = useSelector((state) => state.navigation.isMenuOpen);
  const [products, setProducts] = useState([]);
  const element = useRef(null);
  const shopTheLookContainer = useRef(null);
  const fadeContainer = useRef(null);
  const textwithRList = useRef(null);

  useEffect(() => {
    if (isLoading || !shopTheLookContainer.current) return;

    const animateElements = () => {
      const shop_the_look_img = document.querySelector("#shop-the_look");
      const room_card = document.querySelector(".room--card");
      const splitText = document.querySelectorAll(".split-text");

      const animations = [
        {
          target: shopTheLookContainer.current,
          child: shop_the_look_img,
          className: "reveal",
        },
        {
          target: shopTheLookContainer.current,
          child: room_card,
          className: "visible",
        },
      ];

      animations.forEach(({ target, child, className }) => {
        animateElementOnView(target, addClass, 0.1, child, className);
      });
      splitText.forEach((text) => {
        animateElementOnView(
          fadeContainer.current,
          addClass,
          0.1,
          text,
          "reveal"
        );
      });
    };

    animateElements();
  }, [isLoading]);

  useEffect(() => {
    async function fetchData(page = 1, limit = 12) {
      try {
        const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
        const data = await res.json();

        if (res.status === 200) {
          setProducts(data.products);
        } else {
          setError(true);
        }
      } catch (error) {
        console.log("error fetching data", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const getReelItems = (length) => {
    if (products.length <= 0) return [];
    const reelItems = [];

    for (let i = 1; i < Math.min(length, products.length); i++) {
      reelItems.push(products[i]);
    }

    return reelItems;
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div>Hmmmm! Seems like you are'nt connected to the internet</div>;
  }

  return (
    <>
      {!isLoading && <NewsLetter />}
      <section>
        <div>
          <div
            className="min-h-[80vh] md:min-h-auto w-full relative flex bg-milk text-milk"
            style={{ aspectRatio: "1.5" }}
          >
            <ImgWithTextBlock
              className="absolute left-0 top-0 w-full h-full overflow-hidden block"
              imgSrc="//roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=2500"
              srcSet="//roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=600 600w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=700 700w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=800 800w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=1000 1000w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=1200 1200w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=1400 1400w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=1600 1600w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=1800 1800w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=2000 2000w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=2200 2200w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=2400 2400w"
              imgAlt=""
              style={{ opacity: 1 }}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-[1600px] px-6 md:px-10">
          <div className="mb-11 text-[#5e3519] text-center text-sm md:text-md lg:text-lg">
            THIS IS THE NEW NOSTALGIA
          </div>

          <div className="image-with_text-wrapper">
            <ImgWithTextWrapper
              className="order-2 relative overflow-hidden w-full z-0"
              src="//roweam.com/cdn/shop/files/101641_Bromley_Chair_0628_1600x1600_82ef79e5-85a7-4be6-8b16-881108f9f6b9.jpg?v=1717161137&width=1500"
              srcSet="//roweam.com/cdn/shop/files/101641_Bromley_Chair_0628_1600x1600_82ef79e5-85a7-4be6-8b16-881108f9f6b9.jpg?v=1717161137&width=600 600w, //roweam.com/cdn/shop/files/101641_Bromley_Chair_0628_1600x1600_82ef79e5-85a7-4be6-8b16-881108f9f6b9.jpg?v=1717161137&width=700 700w, //roweam.com/cdn/shop/files/101641_Bromley_Chair_0628_1600x1600_82ef79e5-85a7-4be6-8b16-881108f9f6b9.jpg?v=1717161137&width=800 800w, //roweam.com/cdn/shop/files/101641_Bromley_Chair_0628_1600x1600_82ef79e5-85a7-4be6-8b16-881108f9f6b9.jpg?v=1717161137&width=1000 1000w, //roweam.com/cdn/shop/files/101641_Bromley_Chair_0628_1600x1600_82ef79e5-85a7-4be6-8b16-881108f9f6b9.jpg?v=1717161137&width=1200 1200w, //roweam.com/cdn/shop/files/101641_Bromley_Chair_0628_1600x1600_82ef79e5-85a7-4be6-8b16-881108f9f6b9.jpg?v=1717161137&width=1400 1400w"
              alt=""
            />
            <div className="order-1 z-[1] block relative mr-0">
              <div className="flex flex-nowrap">
                <div className="block flex-shrink-0 w-full order-0 text-center">
                  <div className="my-4 text-[#5e3519] font-medium text-sm">
                    <span className="block">ROWEAM NEW VINTAGE</span>
                  </div>
                  <div className="mt-12 mb-6 h2">
                    <span className="block text-4xl md:text-5xl text-[#5e3519]">
                      The Bromley Chair
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-normal">
                      A take on our iconic Bromley Sofa, the Bromley Chair is an
                      amalgamation of eras and styles. Perfect for cozying up
                      with your favorite book, it's angular arms are designed
                      for lounging.
                    </p>

                    <div className="mt-8 text-center">
                      <Link
                        href=""
                        className="w-max relative text-center text-[#5e3519] uppercase text-[13px] shop-button"
                      >
                        shop the collection
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block w-full">
        <div style={{ display: "flow-root", bakground: "transparent" }}>
          <div className="w-full max-w-[1600px] p-0 md:p-10">
            <header className="max-w-full my-7 md:my-7 md:m-0 block px-6 md:px-0">
              <div>
                <div className="flex items-center space-x-6">
                  <h4 className="h2 text-lightBrown text-3xl">Made To Age</h4>
                  <div className="mt-0 block">
                    <a
                      href="/"
                      style={{ backgroundPosition: "99% -97%, 99% 99%" }}
                      className="text-lightBrown relative text-sm shop-button"
                    >
                      SHOP ALL
                    </a>
                  </div>
                </div>

                <div className="grid-item mt-4">
                  {["new vintage", "true vintage", "new & true vintage"].map(
                    (li, idx) => (
                      <div className="flex items-center space-x-2" key={li}>
                        <div
                          className="flex items-center justify-center w-4 h-4  rounded-full"
                          style={{
                            border:
                              vintageSelect === idx
                                ? "1px solid #5e3519"
                                : "1px solid #a5a097",
                          }}
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                vintageSelect === idx ? "#5e3519" : "",
                            }}
                            onClick={() => setVintageSelect(idx)}
                          />
                        </div>

                        <div>
                          <h6 className="text-darkGray capitalize text-sm">
                            {li}
                          </h6>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </header>
            {isLoading ? (
              <LoadingSkeleton></LoadingSkeleton>
            ) : (
              <ProductReel products={getReelItems(7)} isLoading={isLoading} />
            )}
          </div>
        </div>
      </section>

      <section ref={shopTheLookContainer}>
        <div className="w-full relative mt-10" id="shop-the_look">
          <div className="relative overflow-hidden text-milk">
            <div className="absolute bottom-6 md:bottom-10 left-0 w-full">
              <div className="w-full max-w-[1600px] px-6 md:px-10">
                <div className="max-w-[500px]">
                  <div className="h2 text-2xl text-[34px] md:text-4xl">
                    Sabi In Situ
                  </div>
                  <div className="mt-[15px]">
                    <p>
                      A clean line of tailored upholstery, simple and elegant.
                      Drawing inspiration from the seamless fusion of strength
                      and femininity, the Sabi embodies a symphony of grace and
                      allure.
                    </p>
                    <div className="mt-5">
                      <Link
                        href=""
                        className="inline-block uppercase relative shop-room-button text-sm"
                      >
                        shop this room
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="//roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=2500"
                srcSet="//roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=500 500w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=600 600w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=700 700w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=800 800w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=1000 1000w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=1200 1200w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=1400 1400w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=1600 1600w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=1800 1800w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=2000 2000w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=2200 2200w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=2400 2400w"
                alt="product image"
                className="w-full object-cover object-center hidden md:inline-block"
              />
              <img
                src="//roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_Handheld_0519.jpg?v=1731943467&width=1874"
                srcset="//roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_Handheld_0519.jpg?v=1731943467&width=500 500w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_Handheld_0519.jpg?v=1731943467&width=600 600w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_Handheld_0519.jpg?v=1731943467&width=700 700w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_Handheld_0519.jpg?v=1731943467&width=800 800w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_Handheld_0519.jpg?v=1731943467&width=1000 1000w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_Handheld_0519.jpg?v=1731943467&width=1200 1200w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_Handheld_0519.jpg?v=1731943467&width=1400 1400w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_Handheld_0519.jpg?v=1731943467&width=1600 1600w"
                alt="product image"
                className="object-cover object-center inline-block md:hidden"
              />
            </div>
            <div className="absolute top-[26%] md:top-[53%] left-[36%] md:left-[50%] ml-[-12px] mt-[-12px]">
              <button
                type="button"
                aria-expanded="true"
                className="w-4 h-4 float-left rounded-full border border-milk tap-area"
              >
                <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                  Table Lamps
                </span>
              </button>
              <div
                className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-1/2 shadow-md z-[1] bg-[#221f20] room--card"
                style={{ left: "calc(100% + 7px)" }}
              >
                <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                  <img
                    src="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=1500"
                    srcSet="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=144 144w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=216 216w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=288 288w"
                    alt="product image"
                    className="h-full w-full object-cover object-center bg-[#a5a097]"
                  />
                </div>
                <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                  <Link
                    href="/"
                    className="pointer-events-none block mb-[2px] text-sm text-lightBrown bg-milk"
                  >
                    Lorenzo Sofa
                  </Link>
                  <div className="w-full">
                    <Link
                      href=""
                      className="pointer-events-none block mb-[2px] uppercase text-sm shop-room-button relative w-max"
                    >
                      see more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[55%] md:top-[70%] left-[78%] md:left-[52%] ml-[-12px] mt-[-12px]">
              <button
                type="button"
                className="w-4 h-4 float-left rounded-full border border-milk tap-area"
              >
                <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                  Coffee Table
                </span>
              </button>
              <div
                className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
                style={{
                  opacity: "1",
                  visibility: "hidden",
                  transform: "scale(1) translateY(-50%)",
                  left: "calc(100% + 7px)",
                  gridTemplateColumns: "100px 100px",
                }}
              >
                <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                  <img
                    src="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=1500"
                    srcSet="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=144 144w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=216 216w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=288 288w"
                    alt="product image"
                    className="h-full w-full object-cover object-center bg-[#a5a097]"
                  />
                </div>
                <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                  <Link
                    href="/"
                    className="pointer-events-none block mb-[2px] text-xs"
                  >
                    Lorenzo Sofa
                  </Link>
                  <div className="w-full">
                    <Link
                      href="/"
                      className="pointer-events-none block mb-[2px] uppercase text-sm shop-room-button relative w-max"
                    >
                      see more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[55%] md:top-[50%] left-[78%] md:left-[85%] ml-[-12px] mt-[-12px]">
              <button
                type="button"
                className="w-4 h-4 float-left rounded-full border border-milk tap-area"
              >
                <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                  Vasses & Vessels
                </span>
              </button>
              <div
                className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
                style={{
                  opacity: "1",
                  visibility: "hidden",
                  transform: "scale(1) translateY(-50%)",
                  left: "calc(100% + 7px)",
                  gridTemplateColumns: "100px 100px",
                }}
              >
                <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                  <img
                    src="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=1500"
                    srcSet="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=144 144w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=216 216w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=288 288w"
                    alt="product image"
                    className="h-full w-full object-cover object-center bg-[#a5a097]"
                  />
                </div>
                <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                  <Link
                    href="/"
                    className="pointer-events-none block mb-[2px] text-xs"
                  >
                    Lorenzo Sofa
                  </Link>
                  <div className="w-full">
                    <Link
                      href="/"
                      className="pointer-events-none block mb-[2px] uppercase text-sm shop-room-button relative w-max"
                    >
                      see more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[55%] md:top-[82%] left-[78%] md:left-[70%] ml-[-12px] mt-[-12px]">
              <button
                type="button"
                className="w-4 h-4 float-left rounded-full border border-milk tap-area"
              >
                <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                  Arnt Lande Chair by Møller & Stokke Arnt Lande Chair by Møller
                  & Stokke
                </span>
              </button>
              <div
                className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
                style={{
                  opacity: "1",
                  visibility: "hidden",
                  transform: "scale(1) translateY(-50%)",
                  left: "calc(100% + 7px)",
                  gridTemplateColumns: "100px 100px",
                }}
              >
                <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                  <img
                    src="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=1500"
                    srcSet="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=144 144w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=216 216w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=288 288w"
                    alt="product image"
                    className="h-full w-full object-cover object-center bg-[#a5a097]"
                  />
                </div>
                <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                  <Link
                    href="/"
                    className="pointer-events-none block mb-[2px] text-xs"
                  >
                    Lorenzo Sofa
                  </Link>
                  <div className="w-full">
                    <Link
                      href="/"
                      className="pointer-events-none block mb-[2px] uppercase text-sm shop-room-button relative w-max"
                    >
                      see more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[55%] md:top-[59%] left-[78%] md:left-[5%] ml-[-12px] mt-[-12px]">
              <button
                type="button"
                className="w-4 h-4 float-left rounded-full border border-milk tap-area"
              >
                <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                  Lawrence Peabody Chaise
                </span>
              </button>
              <div
                className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
                style={{
                  opacity: "1",
                  visibility: "hidden",
                  transform: "scale(1) translateY(-50%)",
                  left: "calc(100% + 7px)",
                  gridTemplateColumns: "100px 100px",
                }}
              >
                <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                  <img
                    src="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=1500"
                    srcSet="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=144 144w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=216 216w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=288 288w"
                    alt="product image"
                    className="h-full w-full object-cover object-center bg-[#a5a097]"
                  />
                </div>
                <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                  <Link
                    href="/"
                    className="pointer-events-none block mb-[2px] text-xs"
                  >
                    Lorenzo Sofa
                  </Link>
                  <div className="w-full">
                    <Link
                      href="/"
                      className="pointer-events-none block mb-[2px] uppercase text-sm shop-room-button relative w-max"
                    >
                      see more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[55%] md:top-[30%] left-[78%] md:left-[73%] ml-[-12px] mt-[-12px]">
              <button
                type="button"
                className="w-4 h-4 float-left rounded-full border border-milk tap-area"
              >
                <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                  Amber Bucolic Tapestry
                </span>
              </button>
              <div
                className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
                style={{
                  opacity: "1",
                  visibility: "hidden",
                  transform: "scale(1) translateY(-50%)",
                  left: "calc(100% + 7px)",
                  gridTemplateColumns: "100px 100px",
                }}
              >
                <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                  <img
                    src="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=1500"
                    srcSet="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=144 144w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=216 216w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=288 288w"
                    alt="product image"
                    className="h-full w-full object-cover object-center bg-[#a5a097]"
                  />
                </div>
                <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                  <Link
                    href="/"
                    className="pointer-events-none block mb-[2px] text-xs"
                  >
                    Table Lamps
                  </Link>
                  <div className="w-full">
                    <Link
                      href="/"
                      className="pointer-events-none block mb-[2px] uppercase text-sm shop-room-button relative w-max"
                    >
                      see more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[57%] md:top-[45%] left-[24%] md:left-[27%] ml-[-12px] mt-[-12px]">
              <button
                type="button"
                className="w-4 h-4 float-left rounded-full border border-milk tap-area"
              >
                <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                  Table Lamps
                </span>
              </button>
              <div
                className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
                style={{
                  opacity: "1",
                  visibility: "hidden",
                  transform: "scale(1) translateY(-50%)",
                  left: "calc(100% + 7px)",
                  gridTemplateColumns: "100px 100px",
                }}
              >
                <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                  <img
                    src="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=1500"
                    srcSet="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=144 144w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=216 216w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=288 288w"
                    alt="product image"
                    className="h-full w-full object-cover object-center bg-[#a5a097]"
                  />
                </div>
                <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                  <Link
                    href="/"
                    className="pointer-events-none block mb-[2px] text-xs"
                  >
                    Table Lamps
                  </Link>
                  <div className="w-full">
                    <Link
                      href="/"
                      className="pointer-events-none block mb-[2px] uppercase text-sm shop-room-button relative w-max"
                    >
                      see more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="w-full max-w-[1600px] px-0 md:px-10">
          <div className="image-with-text">
            <div className="w-full px-6 md:p-16">
              <div>
                <h5 className="text-lightBrown text-sm" id="slide-up">
                  <span className="uppercase text-sm">
                    Part new vintage, part true vintage
                  </span>
                </h5>

                <div className="mt-4">
                  <SplitLines
                    text1="The Roweam"
                    text2="Method"
                    className="text-[56px] leading-[1] text-lightBrown h2"
                  />
                </div>

                <div className="max-w-[80%] mt-6" id="slide-up">
                  <FadeText
                    text=" Part new vintage, part true vintage. Our design method takes
                    a gathered, authentic approach using well-constructed pieces
                    complete with endless character, no matter their age."
                  />
                </div>

                <div className="mt-8">
                  <Link
                    href="/"
                    className="shop-button relative uppercase text-lightBrown text-[13px]"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap h-full w-full">
              <ImgWithTextWrapper
                className="overflow-hidden order-2 h-full w-full"
                src="//roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=2000"
                srcSet="//roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=600 600w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=700 700w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=800 800w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=1000 1000w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=1200 1200w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=1400 1400w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=1600 1600w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=1800 1800w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=2000 2000w"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="image-with-text-r-list">
          <div className="px-6 md:px-10 w-full">
            <div className="overflow-hidden flex flex-wrap">
              <ImgWithTextWrapper
                className="relative w-full overflow-hidden mb-8"
                src="//roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=2000"
                srcSet="//roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=600 600w, //roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=700 700w, //roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=800 800w, //roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=1000 1000w, //roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=1200 1200w, //roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=1400 1400w"
                alt=""
              />
            </div>
          </div>

          <div className="p-6 md:p-16">
            <div className="flex flex-wrap">
              <div className="w-full order-2 shrink-0">
                <div className="my-4 text-lightBrown">
                  <span className="uppercase">join the r list</span>
                </div>

                <div className="h2 text-lightBrown">
                  <span className="text-lg md:text-xl lg:text-2xl">
                    Sign-up to recieve 10%off your first
                  </span>
                  <span className="text-lg md:text-xl lg:text-2xl">
                    purchase and you'll hear about our new
                  </span>
                  <span className="text-lg md:text-xl lg:text-2xl">
                    production collections, antiquities, and more
                  </span>
                  <span className="text-lg md:text-xl lg:text-2xl">
                    before anyone else!
                  </span>
                </div>

                <div className="mt-11 relative" id="r-form">
                  <form>
                    <div
                      className="flex justify-start items-center py-3 relative"
                      style={{ backgroundColor: activeRList ? "#f3f1ea" : "" }}
                    >
                      <input
                        type="email"
                        placeholder="Your Email"
                        onFocus={() => setActiveRList(true)}
                        onBlur={() => setActiveRList(false)}
                        className="r-list outline-none w-full h-full"
                      />

                      <div className="absolute right-0 flex items-center justify-center w-4 h-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          id="right-arrow"
                          width="20px"
                          height="20px"
                          fill="#221f20"
                        >
                          <path d="M22.707,12.707a1,1,0,0,0,0-1.414l-6-6a1,1,0,0,0-1.414,1.414L19.586,11H2a1,1,0,0,0,0,2H19.586l-4.293,4.293a1,1,0,0,0,1.414,1.414Z"></path>
                        </svg>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
