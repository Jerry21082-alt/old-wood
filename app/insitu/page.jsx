"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function page() {
  useEffect(() => {
    const revealItems = document.querySelectorAll("#reveal-more");
    const items = gsap.utils.toArray(revealItems);

    items.forEach((item) => {
      gsap.to(item, {
        y: "-50%",
        opacity: 1,
        scale: 1,
        visibility: "visible",
        duration: 0.2,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          //   scrub: true,
          //   once: true,
          //   toggleActions: "play none none none",
        },
      });
    });
  }, []);

  useEffect(() => {
    const shoptTheLookItems = document.querySelectorAll("#shop-the-look");
    const items = gsap.utils.toArray(shoptTheLookItems);

    items.forEach((item) => {
      gsap.fromTo(
        item,
        {
          clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          opacity: 0,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
            once: true,
            toggleActions: "play none none none",
          },
        }
      );
    });
  });

  return (
    <section className="mt-20 md:mt-32 relative block overflow-hidden">
      <div
        className="w-full relative"
        id="shop-the-look"
        style={{ transition: "clip-path .25s ease-out" }}
      >
        <div className="relative overflow-hidden text-milk">
          <div className="absolute bottom-6 md:bottom-10 left-0 w-full">
            <div className="w-full max-w-[1600px] px-6 md:px-10">
              <div className="max-w-[500px]">
                <div className="h2 text-xl md:text-[34px]">Sabi In Situ</div>
                <div className="mt-[15px]">
                  <p>
                    A clean line of tailored upholstery, simple and elegant.
                    Drawing inspiration from the seamless fusion of strength and
                    femininity, the Sabi embodies a symphony of grace and
                    allure.
                  </p>
                  <div className="mt-5">
                    <Link
                      href="/"
                      className="inline-block uppercase relative shop-room-button"
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
              src="//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=2500"
              srcSet="//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=500 500w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=600 600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=700 700w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=800 800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=1000 1000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=1200 1200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=1400 1400w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=1600 1600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=1800 1800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=2000 2000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=2200 2200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=2400 2400w"
              alt="product image"
              className="w-full object-cover object-center hidden md:inline-block"
            />
            <img
              src="//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_2aeeb711-0c31-40cf-af10-f813e2011586.jpg?v=1717414234&width=1178"
              srcSet="//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_2aeeb711-0c31-40cf-af10-f813e2011586.jpg?v=1717414234&width=500 500w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_2aeeb711-0c31-40cf-af10-f813e2011586.jpg?v=1717414234&width=600 600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_2aeeb711-0c31-40cf-af10-f813e2011586.jpg?v=1717414234&width=700 700w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_2aeeb711-0c31-40cf-af10-f813e2011586.jpg?v=1717414234&width=800 800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_2aeeb711-0c31-40cf-af10-f813e2011586.jpg?v=1717414234&width=1000 1000w"
              alt="product image"
              className="object-cover object-center inline-block md:hidden"
            />
          </div>
          <div className="absolute top-[26%] md:top-[22%] left-[36%] md:left-[45%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area bg-milk"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                Table Lamps
              </span>
            </button>
            <div
              className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
              style={{
                opacity: "0",
                visibility: "hidden",
                transform: "scale(0) translateY(0%)",
                left: "calc(100% + 7px)",
                gridTemplateColumns: "100px 100px",
              }}
              id="reveal-more"
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
                  className="pointer-events-none block mb-[2px] text-xs md:text-sm"
                >
                  Table Lamps
                </Link>
                <div className="w-full">
                  <Link
                    href="/"
                    className="pointer-events-none block mb-[2px] uppercase text-sm md:text-lg shop-room-button relative w-max"
                  >
                    see more
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[55%] md:top-[54%] left-[78%] md:left-[70%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                Seating
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
          <div className="absolute top-[57%] md:top-[38%] left-[24%] md:left-[42%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                Harvard Divinity Desk
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
      <div
        className="w-full relative mt-6 md:mt-10"
        style={{ scrollMarginTop: "62.5px", transition: ".25s ease-out" }}
        id="shop-the-look"
      >
        <div className="relative overflow-hidden text-milk">
          <div className="absolute bottom-6 md:bottom-10 left-0 w-full">
            <div className="w-full max-w-[1600px] px-6 md:px-10">
              <div className="max-w-[500px]">
                <div className="h2 text-xl md:text-[34px]">
                  The Bromley In Situ
                </div>
                <div className="mt-[15px]">
                  <p>
                    Our connerstone collection, designed with families in mind.
                    A curated selection of pieces of specially styled for a life
                    well lived.
                  </p>
                  <div className="mt-5">
                    <Link
                      href="/"
                      className="inline-block uppercase relative shop-room-button"
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
              src="//roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=2500"
              srcSet="//roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=500 500w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=600 600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=700 700w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=800 800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=1000 1000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=1200 1200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=1400 1400w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=1600 1600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=1800 1800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=2000 2000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=2200 2200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=2400 2400w"
              alt="product image"
              className="w-full object-cover object-center hidden md:inline-block"
            />
            <img
              src="//roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=1874"
              srcSet="//roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=500 500w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=600 600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=700 700w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=800 800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=1000 1000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=1200 1200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=1400 1400w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=1600 1600w"
              alt="product image"
              className="object-cover object-center inline-block md:hidden"
            />
          </div>
          <div className="absolute top-[21%] md:top-[28%] left-[27%] md:left-[47%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                Art
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
          <div className="absolute top-[60%] md:top-[54%] left-[62%] md:left-[65%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                Tables
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
          <div className="absolute top-[57%] md:top-[38%] left-[24%] md:left-[42%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                Vases & Vessels
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
          <div className="absolute top-[67%] md:top-[55%] left-[77%] md:left-[42%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area bg-milk"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                Dinning Chairs
              </span>
            </button>
            <div
              className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
              style={{
                opacity: "0",
                visibility: "hidden",
                transform: "scale(1) translateY(0%)",
                right: "calc(100% + 5px)",
                gridTemplateColumns: "100px 100px",
              }}
            >
              <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                <img
                  src="//roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=1500"
                  srcSet="//roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=144 144w, //roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=216 216w, //roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=288 288w"
                  className="h-full w-full object-cover object-center bg-[#a5a097]"
                />
              </div>
              <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                <Link
                  href="/"
                  className="pointer-events-none block mb-[2px] text-xs"
                >
                  Vases & Vessels
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
          <div className="absolute top-[67%] md:top-[55%] left-[77%] md:left-[42%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                Dinning Chairs
              </span>
            </button>
            <div
              className="py-[10px] pl-[10px] pr-[20px] md:grid hidden w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
              style={{
                opacity: "0",
                visibility: "hidden",
                transform: "scale(0) translateY(0%)",
                left: "calc(100% + 7px)",
                gridTemplateColumns: "100px 100px",
              }}
              id="reveal-more"
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
                  className="pointer-events-none block mb-[2px] text-xs md:text-sm"
                >
                  Table Lamps
                </Link>
                <div className="w-full">
                  <Link
                    href="/"
                    className="pointer-events-none block mb-[2px] uppercase text-sm md:text-lg shop-room-button relative w-max"
                  >
                    see more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full relative mt-6 md:mt-10"
        style={{ scrollMarginTop: "62.5px", transition: ".25s ease-out" }}
        id="shop-the-look"
      >
        <div className="relative overflow-hidden text-milk">
          <div className="absolute bottom-6 md:bottom-10 left-0 w-full">
            <div className="w-full max-w-[1600px] px-6 md:px-10">
              <div className="max-w-[500px]">
                <div className="h2 text-xl md:text-[34px]">In Situ Kitchen</div>
                <div className="mt-[15px]">
                  <p>
                    Our Belgian Midcentury project designed by our design team
                    at Moore House Design. A selection of pieces specifically
                    picked for your Kitchen.
                  </p>
                  <div className="mt-5">
                    <Link
                      href="/"
                      className="inline-block uppercase relative shop-room-button"
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
              src="//roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=2500"
              srcSet="//roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=500 500w, //roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=600 600w, //roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=700 700w, //roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=800 800w, //roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=1000 1000w, //roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=1200 1200w, //roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=1400 1400w, //roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=1600 1600w, //roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=1800 1800w, //roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=2000 2000w, //roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=2200 2200w, //roweam.com/cdn/shop/files/Moore_House_Design_Interior_Designer_Blair_Moore_New_England_The_Belgian_Midcentury_Project_Kitchen_04small_7efcd95a-3d03-4d7e-be4c-01bfb1e90bc7.jpg?v=1695061811&width=2400 2400w"
              alt="product image"
              className="w-full object-cover object-center hidden md:inline-block"
            />
            <img
              src="//roweam.com/cdn/shop/files/roweam-mobile02.jpg?v=1687290409&width=1200"
              srcSet="//roweam.com/cdn/shop/files/roweam-mobile02.jpg?v=1687290409&width=500 500w, //roweam.com/cdn/shop/files/roweam-mobile02.jpg?v=1687290409&width=600 600w, //roweam.com/cdn/shop/files/roweam-mobile02.jpg?v=1687290409&width=700 700w, //roweam.com/cdn/shop/files/roweam-mobile02.jpg?v=1687290409&width=800 800w, //roweam.com/cdn/shop/files/roweam-mobile02.jpg?v=1687290409&width=1000 1000w, //roweam.com/cdn/shop/files/roweam-mobile02.jpg?v=1687290409&width=1200 1200w"
              alt="product image"
              className="object-cover object-center inline-block md:hidden"
            />
          </div>
          <div className="absolute top-[21%] md:top-[27%] left-[23%] md:left-[30%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                Bowls & Dishes
              </span>
            </button>
            <div
              className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
              style={{
                opacity: "1",
                visibility: "visible",
                transform: "scale(1) translateY(-50%)",
                left: "calc(100% + 7px)",
                gridTemplateColumns: "100px 100px",
                display: "none",
              }}
            >
              <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                <img
                  src="//roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=1500"
                  srcSet="//roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=144 144w, //roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=216 216w, //roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=288 288w"
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
          <div className="absolute top-[18%] md:top-[23%] left-[70%] md:left-[55%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                Art
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
          <div className="absolute top-[50%] md:top-[53%] left-[38%] md:left-[42%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area bg-milk"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                Vases & Vessels
              </span>
            </button>
            <div
              className="py-[10px] pl-[10px] pr-[20px] md:grid hidden w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
              style={{
                opacity: "0",
                visibility: "hidden",
                transform: "scale(0) translateY(0%)",
                left: "calc(100% + 7px)",
                gridTemplateColumns: "100px 100px",
              }}
              id="reveal-more"
            >
              <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                <img
                  src="//roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=1500"
                  srcSet="//roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=144 144w, //roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=216 216w, //roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=288 288w"
                  alt="product image"
                  className="h-full w-full object-cover object-center bg-[#a5a097]"
                />
              </div>
              <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                <Link
                  href="/"
                  className="pointer-events-none block mb-[2px] text-xs md:text-sm"
                >
                  Vases & Vessels
                </Link>
                <div className="w-full">
                  <Link
                    href="/"
                    className="pointer-events-none block mb-[2px] uppercase text-sm md:text-lg  shop-room-button relative w-max"
                  >
                    see more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full relative mt-6 md:mt-10"
        style={{ scrollMarginTop: "62.5px", transition: ".25s ease-out" }}
        id="shop-the-look"
      >
        <div className="relative overflow-hidden text-milk">
          <div className="absolute bottom-6 md:bottom-10 left-0 w-full">
            <div className="w-full max-w-[1600px] px-6 md:px-10">
              <div className="max-w-[500px]">
                <div className="h2 text-xl md:text-[34px]">In Situ Living</div>
                <div className="mt-[15px]">
                  <p>
                    Our Belgian Midcentury project was designed by our design
                    team at Moore House Design. A selection of pieces
                    specifically picked for Living.
                  </p>
                  <div className="mt-5">
                    <Link
                      href="/"
                      className="inline-block uppercase relative shop-room-button"
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
              src="//roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=3000"
              srcSet="//roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=500 500w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=600 600w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=700 700w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=800 800w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=1000 1000w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=1200 1200w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=1400 1400w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=1600 1600w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=1800 1800w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=2000 2000w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=2200 2200w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=2400 2400w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=2600 2600w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=2800 2800w, //roweam.com/cdn/shop/files/roweam-insitu02.jpg?v=1687295563&width=3000 3000w"
              alt="product image"
              className="w-full object-cover object-center hidden md:inline-block"
            />
            <img
              src="//roweam.com/cdn/shop/files/roweam-mobile04.jpg?v=1687295563&width=1200"
              srcSet="//roweam.com/cdn/shop/files/roweam-mobile04.jpg?v=1687295563&width=500 500w, //roweam.com/cdn/shop/files/roweam-mobile04.jpg?v=1687295563&width=600 600w, //roweam.com/cdn/shop/files/roweam-mobile04.jpg?v=1687295563&width=700 700w, //roweam.com/cdn/shop/files/roweam-mobile04.jpg?v=1687295563&width=800 800w, //roweam.com/cdn/shop/files/roweam-mobile04.jpg?v=1687295563&width=1000 1000w, //roweam.com/cdn/shop/files/roweam-mobile04.jpg?v=1687295563&width=1200 1200w"
              alt="product image"
              className="object-cover object-center inline-block md:hidden"
            />
          </div>
          <div className="absolute top-[30%] md:top-[35%] left-[15%] md:left-[87%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area bg-milk"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                The Bromley Sofa
              </span>
            </button>
            <div
              className="py-[10px] pl-[10px] pr-[20px] md:grid hidden w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
              id="reveal-more"
              style={{
                opacity: "0",
                visibility: "hidden",
                transform: "scale(0) translateY(0%)",
                right: "calc(100% + 7px)",
                gridTemplateColumns: "100px 100px",
              }}
            >
              <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                <img
                  src="//roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=1125"
                  srcSet="//roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=144 144w, //roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=216 216w, //roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=288 288w"
                  className="h-full w-full object-cover object-center bg-[#a5a097]"
                />
              </div>
              <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                <Link
                  href="/"
                  className="pointer-events-none block mb-[2px] text-xs md:text-sm"
                >
                  Bromley Sofa
                </Link>
                <div className="w-full">
                  <Link
                    href="/"
                    className="pointer-events-none block mb-[2px] uppercase text-sm md:text-lg shop-room-button relative w-max"
                  >
                    see more
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[42%] md:top-[42%] left-[66%] md:left-[36%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm">
                Vases & Vessels
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
          <div className="absolute top-[57%] md:top-[53%] left-[54%] md:left-[34%] ml-[-12px] mt-[-12px]">
            <button
              type="button"
              className="w-4 h-4 float-left rounded-full border border-milk tap-area"
            >
              <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                Decorative Objects
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
  );
}
