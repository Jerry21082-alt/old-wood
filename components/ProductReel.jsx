import Link from "next/link";
import AspectRatioContainer from "./AspectRatioContainer";
import { formatPrice } from "@/helpers/formatPrice";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ProductReel({ products, isLoading }) {
  // useEffect(() => {
  //   const items = gsap.utils.toArray(".product_item");
  //   if (items.length > 0) {
  //     gsap.fromTo(
  //       items,
  //       { opacity: 0, y: 30 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         stagger: 0.6,
  //         scrollTrigger: {
  //           trigger: items[0].parentNode,
  //           start: "top 80%",
  //           end: "top 50%",
  //           once: true,
  //           toggleActions: "play none none none",
  //         },
  //       }
  //     );
  //   }

  //   items.forEach((item) => {
  //     const primaryImage = item.querySelector("#primary-img");
  //     const secondaryImage = item.querySelector("#secondary-img");

  //     gsap.set(secondaryImage, { autoAlpha: 0 });

  //     const handleMouseEnter = () => {
  //       gsap.to(primaryImage, { autoAlpha: 0, duration: 0.4 });
  //       gsap.to(secondaryImage, { autoAlpha: 1, duration: 0.4 });
  //     };

  //     const handleMouseLeave = () => {
  //       gsap.to(primaryImage, { autoAlpha: 1, duration: 0.4 });
  //       gsap.to(secondaryImage, { autoAlpha: 0, duration: 0.4 });
  //     };

  //     item.addEventListener("mouseenter", handleMouseEnter);
  //     item.addEventListener("mouseleave", handleMouseLeave);

  //     return () => {
  //       item.removeEventListener("mouseenter", handleMouseEnter);
  //       item.removeEventListener("mouseleave", handleMouseLeave); // Fixed from "mouseenter"
  //     };
  //   });
  // }, []);

  return (
    <section className="relative w-full" id="product-reel_container">
      <div
        className="absolute hidden md:block z-10 cursor-pointer active:scale-95 transition-all direction"
        style={{
          top: "calc(50% - 55px)",
          right: "calc(5% - 24px)",
          opacity: "0",
          visibility: "hidden",
          transition: "opacity .25s ease-in-out, visibility .25s ease-in-out",
        }}
        id="arrow-right"
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
          <title>scroll right</title>
          <path d="M20.5 2.293c-10.045 0-18.207 8.163-18.207 18.207s8.163 18.207 18.207 18.207c10.044 0 18.207-8.163 18.207-18.207s-8.163-18.207-18.207-18.207zM20.5 2.999c9.645 0 17.501 7.856 17.501 17.501s-7.856 17.501-17.501 17.501c-9.645 0-17.501-7.856-17.501-17.501s7.856-17.501 17.501-17.501zM23.385 14.869c-0.088 0-0.176 0.032-0.249 0.105-0.147 0.147-0.147 0.35 0 0.496l4.679 4.679h-15.478c-0.206 0-0.357 0.151-0.357 0.357s0.146 0.35 0.357 0.35h15.471l-4.679 4.679c-0.147 0.147-0.147 0.35 0 0.496 0.074 0.074 0.157 0.105 0.254 0.105s0.176-0.030 0.252-0.105l5.281-5.281c0.147-0.147 0.147-0.35 0-0.496l-5.281-5.281c-0.073-0.073-0.161-0.105-0.249-0.105z" />
        </svg>
      </div>
      <div
        className="absolute hidden md:block z-10 cursor-pointer active:scale-95 transition-all"
        style={{
          top: "calc(50% - 55px)",
          left: "calc(5% - 24px)",
          opacity: "0",
          visibility: "hidden",
          transition: "opacity .25s ease-in-out, visibility .25s ease-in-out",
        }}
        id="arrow-left"
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
          <title>scroll left</title>
          <path d="M20.5 2.293c-10.045 0-18.207 8.163-18.207 18.207 0 10.044 8.163 18.207 18.207 18.207 10.044 0 18.207-8.163 18.207-18.207s-8.163-18.207-18.207-18.207zM20.5 2.999c9.645 0 17.501 7.856 17.501 17.501s-7.856 17.501-17.501 17.501c-9.645 0-17.501-7.856-17.501-17.501s7.856-17.501 17.501-17.501zM17.622 14.862c-0.088 0-0.176 0.032-0.249 0.105l-5.281 5.281c-0.147 0.147-0.147 0.35 0 0.496l5.274 5.287c0.076 0.076 0.155 0.105 0.252 0.105s0.18-0.031 0.254-0.105c0.147-0.147 0.147-0.35 0-0.496l-4.679-4.679h15.471c0.206 0 0.357-0.151 0.357-0.357s-0.151-0.357-0.357-0.357h-15.471l4.679-4.679c0.147-0.147 0.147-0.35 0-0.496-0.073-0.073-0.161-0.105-0.249-0.105z" />
        </svg>
      </div>
      <div
        className="overflow-x-auto overflow-y-hidden custom-scrollbar w-full relative"
        style={{ scrollSnapType: "x mandatory" }}
        id="scroller"
      >
        <div
          className="grid grid-cols-none grid-flow-col px-6 md:px-0 reel"
          style={{
            justifyContent: "safe start",
            gap: "48px 24px",
          }}
        >
          {products.map((item) => (
            <div className="flex flex-col relative product_item" key={item.id}>
              <div
                className="relative mb-4"
                style={{
                  opacity: "1",
                  transition: "opacity .4s ease, transform .4s ease",
                }}
              >
                <div className="absolute right-2 top-2 z-10 flex flex-col items-end">
                  {item.toOrder && (
                    <span className="text-darkBrown py-1 px-2 bg-snow text-xs md:text-sm">
                      Made to Order
                    </span>
                  )}
                </div>
                <AspectRatioContainer
                  aspectRatio={3 / 4}
                  className="block relative mb-4"
                >
                  <Link
                    href={`/product_page/${item._id}`}
                    id="custom-aspect-ratio"
                    className="w-full h-full"
                  >
                    <img
                      src={item.primaryImage.img}
                      srcSet={item.primaryImage.srcSet}
                      alt="product image"
                      id="primary-img"
                      className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
                    />
                    <img
                      src={item.secondaryImage.img}
                      alt="product image"
                      id="secondary-img"
                      className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full secondary-img"
                    />
                  </Link>
                </AspectRatioContainer>

                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <Link
                      className="mt-[1px] mr-[10px] mb-[8px] h2 text-sm md:text-md lg:text-lg"
                      href="/"
                    >
                      {item.name}
                    </Link>
                    <div className="text-lightBrown h2 text-sm md:text-md lg:text-lg">
                      {item.type}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="mt-[1px] mr-[10px] mb-[8px] flex flex-wrap justify-end">
                      <span>From&nbsp;</span>
                      <span>${formatPrice(item.price)}</span>
                    </div>

                    <div className="flex items-center justify-end">
                      {item.colors.map((color, idx) => (
                        <div
                          className="w-2 h-2 rounded-full ml-2"
                          key={idx}
                          style={{ backgroundColor: `#${color}` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
