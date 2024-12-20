"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitLines from "@/components/SplitLines";
import { animateElementOnView } from "@/helpers/animateElementOnView";
import { addClass } from "@/helpers/addClass";
import FadeText from "@/components/FadeText";
import ImgWithTextBlock from "@/components/ImgWithTextBlock";
import ImgWithTextWrapper from "@/components/ImgWithTextWrapper";

gsap.registerPlugin(ScrollTrigger);

export default function page() {
  const [isMobile, setIsMobile] = useState(false);
  const odeRef = useRef(null);
  const odeImg = useRef(null);
  const aboutRef = useRef(null);
  const aboutImg = useRef(null);

  const anchorLinks = [
    {
      href: "/about",
      linkText: "About",
    },
    {
      href: "/nolstagia",
      linkText: "The New Nostalgia",
    },
    {
      href: "/progress",
      linkText: "Progress",
    },
    {
      href: "/contact",
      linkText: "Contact",
    },
    {
      href: "/interior",
      linkText: "Interior Design",
    },
  ];

  const styles = {
    mobileImgFull: isMobile
      ? {
          width:
            "calc(calc((100vw - max(calc((100vw - calc( 1600px - ( 40px ) * 2) ) / 2), 40px ) * 2 - 24px * ( 20 - 1)) / 20 )* 14 + 24px* 13",
          transition: "opacity .25s ease-out, clip-path .25s ease-out",
        }
      : {
          marginLeft:
            "calc((100vw - max(calc((100vw - calc(1600px - (40px) * 2)) / 2), 40px) * 2 - 24px * (20 - 1)) / 20)",
        },
    mobileTextFull: isMobile
      ? {
          marginLeft:
            "calc((100vw - max(calc((100vw - calc( 1600px - ( 40px ) * 2) ) / 2), 40px ) * 2 - 24px * ( 20 - 1)) / 20 )",
          padding: "64px",
          marginTop: "80px",
          marignBottom: "80px",
          position: "relative",
        }
      : {},
    heading: isMobile
      ? {
          margin: "48px 0 32px",
        }
      : {},
    imageWithTextWrapper: isMobile
      ? {
          marginRight:
            "calc((100vw - max(calc((100vw - calc( 1600px - ( 40px ) * 2) ) / 2), 40px ) * 2 - 24px * ( 20 - 1)) / 20 )",
        }
      : {},
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setIsMobile(window.innerWidth >= 999);

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const handleScrollToView = () => {
      const animations = [
        {
          element: odeRef.current,
          child: odeImg.current,
          className: "reveal",
        },
        {
          element: aboutRef.current,
          child: aboutImg.current,
          className: "reveal",
        },
      ];

      animations.forEach((ele) => {
        animateElementOnView(ele.element, addClass, 0.1, ele.child, "reveal");
      });
    };

    handleScrollToView();
  }, []);

  return (
    <section className="pt-[65.5px]">
      <div className="w-full mt-7 md:my-20">
        <div className="flex relative flex-wrap items-start md:items-center h-auto md:min-h-[700px]">
          <ImgWithTextBlock
            style={styles.mobileImgFull}
            imgAlt={""}
            className="order-2 overflow-hidden bg-milk relative md:absolute w-full top-0 md:bg-milk left-auto right-0 h-full"
            imgSrc="//roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0197_CROP_45e3e4f1-cf5b-4603-841f-23fa11a03bb2.jpg?v=1694799944&width=2500"
            srcSet="//roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0197_CROP_45e3e4f1-cf5b-4603-841f-23fa11a03bb2.jpg?v=1694799944&width=600 600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0197_CROP_45e3e4f1-cf5b-4603-841f-23fa11a03bb2.jpg?v=1694799944&width=700 700w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0197_CROP_45e3e4f1-cf5b-4603-841f-23fa11a03bb2.jpg?v=1694799944&width=800 800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0197_CROP_45e3e4f1-cf5b-4603-841f-23fa11a03bb2.jpg?v=1694799944&width=1000 1000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0197_CROP_45e3e4f1-cf5b-4603-841f-23fa11a03bb2.jpg?v=1694799944&width=1200 1200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0197_CROP_45e3e4f1-cf5b-4603-841f-23fa11a03bb2.jpg?v=1694799944&width=1400 1400w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0197_CROP_45e3e4f1-cf5b-4603-841f-23fa11a03bb2.jpg?v=1694799944&width=1600 1600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0197_CROP_45e3e4f1-cf5b-4603-841f-23fa11a03bb2.jpg?v=1694799944&width=1800 1800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0197_CROP_45e3e4f1-cf5b-4603-841f-23fa11a03bb2.jpg?v=1694799944&width=2000 2000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0197_CROP_45e3e4f1-cf5b-4603-841f-23fa11a03bb2.jpg?v=1694799944&width=2200 2200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0197_CROP_45e3e4f1-cf5b-4603-841f-23fa11a03bb2.jpg?v=1694799944&width=2400 2400w"
          />

          <div
            className="px-6 md:px-10 py-16 relative z-[1] overflow-hidden"
            style={styles.mobileTextFull}
          >
            <div className="h4 mt-14 mr-6" style={styles.heading}>
              <div className="text-[54px] md:text-[74px] block">
                <SplitLines
                  text1="An Ode to"
                  text2="the Home"
                  className="leading-[1] text-lightBrown"
                />
              </div>
            </div>
            <div className="max-w-[80%] md:max-w-[55%] mt-6">
              <FadeText
                text="Our intentional approach is designed to offer new and vintage
                furniture that inspires curiosity within your home."
              />
            </div>
            <div className="order-3 w-full md:px-0">
              <ul
                className="flex md:block border-b md:border-0 mt-[60px] my-0 md:my-[60px] border-listBorder overflow-visible overflow-x-auto w-auto md:w-[200%]"
                style={{ scrollbarWidth: "none" }}
              >
                {anchorLinks.map((link) => (
                  <li key={link.linkText} className="py-[5px]">
                    <h5>
                      <a
                        href="#"
                        className="text-sm relative pr-[10px] text-darkGray"
                      >
                        {link.linkText}
                      </a>
                    </h5>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="m-7 md:my-20">
        <div>
          <div className="pb-6 md:px-10 pt-8 md:pt-0 w-full relative">
            <div className="w-full max-w-[1600px]">
              <div
                className="flex md:grid gap-10 flex-wrap items-start md:items-center grid-flow-dense relative"
                style={{
                  gridTemplateColumns:
                    "calc(60% - calc(40px / 2)) calc(40% - calc(40px / 2))",
                }}
              >
                <ImgWithTextWrapper
                  src="//roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=1400"
                  srcSet="//roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=600 600w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=700 700w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=800 800w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=1000 1000w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=1200 1200w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=1400 1400w"
                  alt=""
                  className="order-2 md:order-none mt-[30px] w-full relative overflow-hidden"
                />
                {/* <div
                  className="order-2 md:order-none mt-[30px] w-full relative overflow-hidden"
                  ref={aboutRef}
                >
                  <img
                    src="//roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=1400"
                    srcSet="//roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=600 600w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=700 700w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=800 800w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=1000 1000w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=1200 1200w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_03_1055-MAIN2_Resized.jpg?v=1694800013&width=1400 1400w"
                    alt="product image"
                    loading="lazy"
                    className="about--img"
                    ref={aboutImg}
                  />
                </div> */}
                <div className="w-full z-[1]">
                  <div className="flex flex-nowrap">
                    <div className="shrink-0 w-full">
                      <div className="my-4 text-lightBrown">
                        <div>
                          <span className="block uppercase text-sm md:text-lg">
                            About
                          </span>
                        </div>
                      </div>
                      <div>
                        <p>
                          Roweam is a luxury furniture brand whose heirloom
                          custom furniture pieces evoke a sense of simple
                          nostalgia. Inspired by the minds of designers, crafted
                          by the hands of artisans, and sourced with leading
                          industry expertise, our collection of new and true
                          vintage is more than what is new and now. It's a
                          tangible experience that inspires a lifetime of
                          comfort.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-7 md:my-20">
        <div>
          <div className="-mb-7 md:pb-[5%] pt-7 md:pt-[5%] pb-7">
            <div className="w-full max-w-[600px] md:max-w-full px-6 md:px-20">
              <div
                className="flex md:grid gap-10 pt-[5%] pb-[5%] flex-wrap items-center relative overflow-hidden"
                style={{
                  gridTemplateColumns:
                    "calc(60% - calc(40px / 2)) calc(40% - calc(40px / 2))",
                }}
              >
                <ImgWithTextWrapper
                  className="mt-[-50%] pl-[30%] md:pl-0 order-2 w-full relative z-0"
                  src="//roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=1400"
                  srcSet="//roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=600 600w, //roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=700 700w, //roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=800 800w, //roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=1000 1000w, //roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=1200 1200w, //roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=1400 1400w"
                  alt=""
                />
                {/* <div
                  className="mt-[-50%] pl-[30%] md:pl-0 order-2 w-full relative z-0"
                  style={styles.imageWithTextWrapper}
                >
                  <img
                    src="//roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=1400"
                    srcSet="//roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=600 600w, //roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=700 700w, //roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=800 800w, //roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=1000 1000w, //roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=1200 1200w, //roweam.com/cdn/shop/files/101032_Art_Deco_Danish_Armchair_1930s_0536_Resized.jpg?v=1694800087&width=1400 1400w"
                    alt="product image"
                    className="max-w-full block h-auto"
                    width="1400"
                    height="1400"
                    loading="lazy"
                    sizes="(max-width: 740px) calc(100vw - 96px), (max-width: 999px) calc(100vw - 160px), 600px"
                  />

                  <div className="py-[15px]">
                    <h5 className="text-[14px] normal-case">
                      Adorning life with handmade details.
                    </h5>
                  </div>
                </div> */}
                <div className="w-full z-[1] order-1">
                  <div className="flex flex-nowrap">
                    <div className="shrink-0 w-full order-none">
                      <div className="my-[40px] md:my-12 mr-4">
                        <div style={{ opacity: 1 }} className="h4">
                          <span className="text-lightBrown text-sm md:text-[34px] leading-[1.2]">
                            Furniture is a gathering place
                          </span>
                          <span className="text-lightBrown text-sm md:text-[34px] leading-[1.2]">
                            and our curated collection is
                          </span>
                          <span className="text-lightBrown text-sm md:text-[34px] leading-[1.2]">
                            the conversation piece.
                          </span>
                        </div>
                      </div>
                      <div style={{ opacity: "1" }}>
                        <Link
                          href="/"
                          className="text-lightBrown whitespace-nowrap w-max uppercase inline-block relative text-sm shop-button"
                        >
                          Shop now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-7 md:my-20 px-6 md:px-10 w-full">
        <div className="w-full">
          <div className="flex md:grid gap-10 pl-0 md:pl-[5%] md:pr-[90px] grid-cols-2 flex-wrap w-full">
            <div className="pb-[30px] pt-[60px] pr-[60px] z-[1]">
              <h5 className="my-[15px] text-lightBrown text-sm">Process</h5>
              <div
                className="mt-4 mr-4 h2 text-[46px] md:text-5xl"
                style={{ lineHeight: 1 }}
              >
                <SplitLines
                  text1="The Roweam"
                  text2="Method"
                  className="leading-[1]"
                />
              </div>
              <div className="max-w-[90%] mt-6">
                <p className="text-sm md:text-md lg:text-lg">
                  Part new vintage, part true vintage, our design method takes a
                  gathered, authentic approach using well-constructed pieces
                  complete with endless character, no matter their age. At
                  Roweam, we believe character is a cornerstone of timeless
                  interiors. We create pieces that are made to age and live
                  through generations.{" "}
                </p>
                <div className="mt-8">
                  <Link
                    href="/"
                    className="shop-button relative uppercase text-sm text-lightBrown"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="grid items-center gap-[5%] py-[30px] w-full"
              style={{ gridTemplateColumns: "35% 60%" }}
            >
              <div className="w-full">
                <img
                  src="//roweam.com/cdn/shop/files/Roweam_Method_4316.jpg?v=1694800301&width=2000"
                  srcSet="//roweam.com/cdn/shop/files/Roweam_Method_4316.jpg?v=1694800301&width=600 600w, //roweam.com/cdn/shop/files/Roweam_Method_4316.jpg?v=1694800301&width=700 700w, //roweam.com/cdn/shop/files/Roweam_Method_4316.jpg?v=1694800301&width=800 800w, //roweam.com/cdn/shop/files/Roweam_Method_4316.jpg?v=1694800301&width=1000 1000w, //roweam.com/cdn/shop/files/Roweam_Method_4316.jpg?v=1694800301&width=1200 1200w, //roweam.com/cdn/shop/files/Roweam_Method_4316.jpg?v=1694800301&width=1400 1400w, //roweam.com/cdn/shop/files/Roweam_Method_4316.jpg?v=1694800301&width=1600 1600w, //roweam.com/cdn/shop/files/Roweam_Method_4316.jpg?v=1694800301&width=1800 1800w, //roweam.com/cdn/shop/files/Roweam_Method_4316.jpg?v=1694800301&width=2000 2000w"
                  alt="product image"
                  className="max-w-full object-center object-contain"
                />
              </div>
              <div className="w-full">
                <div className="text-lightBrown text-sm md:text-md lg:text-lg uppercase">
                  1. the designer
                </div>
                <div className="w-full">
                  <p className="text-sm md:text-md lg:text-lg">
                    Our process begins in the hands of the designer, where
                    generations of experience are developed from a hand sketch
                    and transformed by our engineering team. The intricacies are
                    determined with the highest quality internals in mind, to
                    ensure the longevity of every piece.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="grid items-center gap-[5%] py-[30px] w-full"
              style={{ gridTemplateColumns: "35% 60%" }}
            >
              <div className="w-full">
                <img
                  src="//roweam.com/cdn/shop/files/Roweam_Method_4451_resized.jpg?v=1694800374&width=2000"
                  srcSet="//roweam.com/cdn/shop/files/Roweam_Method_4451_resized.jpg?v=1694800374&width=600 600w, //roweam.com/cdn/shop/files/Roweam_Method_4451_resized.jpg?v=1694800374&width=700 700w, //roweam.com/cdn/shop/files/Roweam_Method_4451_resized.jpg?v=1694800374&width=800 800w, //roweam.com/cdn/shop/files/Roweam_Method_4451_resized.jpg?v=1694800374&width=1000 1000w, //roweam.com/cdn/shop/files/Roweam_Method_4451_resized.jpg?v=1694800374&width=1200 1200w, //roweam.com/cdn/shop/files/Roweam_Method_4451_resized.jpg?v=1694800374&width=1400 1400w, //roweam.com/cdn/shop/files/Roweam_Method_4451_resized.jpg?v=1694800374&width=1600 1600w, //roweam.com/cdn/shop/files/Roweam_Method_4451_resized.jpg?v=1694800374&width=1800 1800w, //roweam.com/cdn/shop/files/Roweam_Method_4451_resized.jpg?v=1694800374&width=2000 2000w"
                  alt="product image"
                  className="max-w-full object-center object-contain"
                />
              </div>
              <div className="w-full">
                <div className="text-lightBrown text-sm md:text-md lg:text-lg uppercase">
                  2. the craftsman
                </div>
                <div className="w-full">
                  <p className="text-sm md:text-md lg:text-lg">
                    It is then passed onto the craftsman to bring the art to
                    life in form and frame. Hours are spent carving, sanding,
                    assembling, and stitching with the touch of the human hand,
                    then it's meticulously inspected for quality control on each
                    and every detail.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="grid items-center gap-[5%] py-[30px] w-full"
              style={{ gridTemplateColumns: "35% 60%" }}
            >
              <div className="w-full">
                <img
                  src="//roweam.com/cdn/shop/files/Roweam_Method_4523_resized.jpg?v=1694800438&width=2000"
                  srcSet="//roweam.com/cdn/shop/files/Roweam_Method_4523_resized.jpg?v=1694800438&width=600 600w, //roweam.com/cdn/shop/files/Roweam_Method_4523_resized.jpg?v=1694800438&width=700 700w, //roweam.com/cdn/shop/files/Roweam_Method_4523_resized.jpg?v=1694800438&width=800 800w, //roweam.com/cdn/shop/files/Roweam_Method_4523_resized.jpg?v=1694800438&width=1000 1000w, //roweam.com/cdn/shop/files/Roweam_Method_4523_resized.jpg?v=1694800438&width=1200 1200w, //roweam.com/cdn/shop/files/Roweam_Method_4523_resized.jpg?v=1694800438&width=1400 1400w, //roweam.com/cdn/shop/files/Roweam_Method_4523_resized.jpg?v=1694800438&width=1600 1600w, //roweam.com/cdn/shop/files/Roweam_Method_4523_resized.jpg?v=1694800438&width=1800 1800w, //roweam.com/cdn/shop/files/Roweam_Method_4523_resized.jpg?v=1694800438&width=2000 2000w"
                  alt="product image"
                  className="max-w-full object-center object-contain"
                />
              </div>
              <div className="w-full">
                <div className="text-lightBrown text-sm md:text-md lg:text-lg uppercase">
                  3. the maker
                </div>
                <div className="w-full">
                  <p className="text-sm md:text-md lg:text-lg">
                    A final prototype is then passed to the makers hands to be
                    produced, down to each minute detail. Hems, cords, stains,
                    and stamps applied, and signed at every step.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="grid items-center gap-[5%] py-[30px] w-full"
              style={{ gridTemplateColumns: "35% 60%" }}
            >
              <div className="w-full">
                <img
                  src="//roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=1500"
                  srcSet="//roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=600 600w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=700 700w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=800 800w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=1000 1000w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=1200 1200w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=1400 1400w"
                  alt="product image"
                  className="max-w-full object-center object-contain"
                />
              </div>
              <div className="w-full">
                <div className="text-lightBrown text-sm md:text-md lg:text-lg uppercase">
                  4. the steward
                </div>
                <div className="w-full">
                  <p className="text-sm md:text-md lg:text-lg">
                    After each finishing touch is perfected and the finest
                    quality assured, it's wrapped and packaged with thoughtful
                    preparation.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="grid items-center gap-[5%] py-[30px] w-full"
              style={{ gridTemplateColumns: "35% 60%" }}
            >
              <div className="w-full">
                <img
                  src="//roweam.com/cdn/shop/files/Roweam_Method_4705.jpg?v=1694800572&width=2000"
                  srcSet="//roweam.com/cdn/shop/files/Roweam_Method_4705.jpg?v=1694800572&width=600 600w, //roweam.com/cdn/shop/files/Roweam_Method_4705.jpg?v=1694800572&width=700 700w, //roweam.com/cdn/shop/files/Roweam_Method_4705.jpg?v=1694800572&width=800 800w, //roweam.com/cdn/shop/files/Roweam_Method_4705.jpg?v=1694800572&width=1000 1000w, //roweam.com/cdn/shop/files/Roweam_Method_4705.jpg?v=1694800572&width=1200 1200w, //roweam.com/cdn/shop/files/Roweam_Method_4705.jpg?v=1694800572&width=1400 1400w, //roweam.com/cdn/shop/files/Roweam_Method_4705.jpg?v=1694800572&width=1600 1600w, //roweam.com/cdn/shop/files/Roweam_Method_4705.jpg?v=1694800572&width=1800 1800w, //roweam.com/cdn/shop/files/Roweam_Method_4705.jpg?v=1694800572&width=2000 2000w"
                  className="max-w-full object-center object-contain"
                />
              </div>
              <div className="w-full">
                <div className="text-lightBrown text-sm md:text-md lg:text-lg uppercase">
                  5. the patron
                </div>
                <div className="w-full">
                  <p className="text-sm md:text-md lg:text-lg">
                    Once carefully placed inside your home, you become its
                    custodians. Created with love
                    <strong>and aged by a life well lived.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="my-7 md:my-20">
          <div className="-mb-7 pt-7 pb-7">
            <div className="w-full px-6 md:px-10">
              <div
                className="flex flex-wrap relative md:grid gap-10 items-start md:items-center"
                style={{
                  gridTemplateColumns:
                    "calc(60% - calc(40px / 2)) calc(40% - calc(40px / 2))",
                }}
              >
                <ImgWithTextWrapper
                  className="w-full relative mb-8 overflow-hidden"
                  src="//roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=2500"
                  srcSet="//roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=600 600w, //roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=700 700w, //roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=800 800w, //roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=1000 1000w, //roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=1200 1200w, //roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=1400 1400w"
                  alt=""
                />
                {/* <div className="w-full relative mb-8 overflow-hidden">
                  <img
                    src="//roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=2500"
                    srcSet="//roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=600 600w, //roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=700 700w, //roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=800 800w, //roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=1000 1000w, //roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=1200 1200w, //roweam.com/cdn/shop/files/contact_us_-about.jpg?v=1694800608&width=1400 1400w"
                    alt=""
                    className="z-[1] relative block w-full"
                  />
                </div> */}
                <div className="mb-6 w-full z-[1]">
                  <div className="flex flex-wrap">
                    <div className="block w-full shrink-0">
                      <div className="my-[40px] mr-4">
                        <div className="mb-6">
                          <span className="block h2 text-2xl md:text-3xl lg:text-4xl">
                            Get in touch
                          </span>
                        </div>
                        <div>
                          <p className="text-sm md:text-md lg:text-lg">
                            Curious about a product or have a question about our
                            process? We're always here and our inbox is always
                            open.{" "}
                          </p>
                          <p className="text-sm md:text-md lg:text-lg mt-6">
                            General Inquiry:{" "}
                            <a href="/" className="relative shop-button">
                              hello@Roweam.com
                            </a>
                          </p>
                          <p className="text-sm md:text-md lg:text-lg">
                            Designer trade program:
                            <a href="/" className="relative shop-button">
                              trade@Roweam.com
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="my-7 md:my-20">
          <div className="-mb-7 pt-7 pb-7">
            <div className="w-full px-6 md:px-10">
              <div
                className="flex flex-wrap items-start md:items-center relative md:grid gap-10"
                style={{
                  gridTemplateColumns:
                    "calc(60% - calc(40px / 2)) calc(40% - calc(40px / 2))",
                }}
              >
                <ImgWithTextWrapper
                  className="w-full relative mb-8 overflow-hidden"
                  src="//roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=2500"
                  srcSet="//roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=600 600w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=700 700w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=800 800w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=1000 1000w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=1200 1200w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=1400 1400w"
                  alt=""
                />
                {/* <div className="w-full relative mb-8 overflow-hidden">
                  <img
                    src="//roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=2500"
                    srcSet="//roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=600 600w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=700 700w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=800 800w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=1000 1000w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=1200 1200w, //roweam.com/cdn/shop/files/20230810-In_Situ-Bromley_05_1066-MAIN2.jpg?v=1702495920&width=1400 1400w"
                    alt="product image"
                    className="z-[1] relative block w-full"
                  />
                </div> */}
                <div className="mb-6 w-full z-[1]">
                  <div className="flex flex-wrap">
                    <div className="block w-full shrink-0">
                      <div className="my-[40px] mr-4">
                        <div className="mb-6">
                          <span className="block h2 text-2xl md:text-3xl lg:text-4xl">
                            Interior Design Services
                          </span>
                        </div>
                        <div>
                          <p className="text-sm md:text-md lg:text-lg">
                            Full service interior design services for whole home
                            transformations.
                          </p>
                          <p className="text-sm md:text-md lg:text-lg mt-6">
                            General Inquiry:{" "}
                            <a href="/" className="relative shop-button">
                              hello@Roweam.com
                            </a>
                          </p>
                        </div>
                      </div>
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
