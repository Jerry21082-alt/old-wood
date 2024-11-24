import Link from "next/link";
import AspectRatioContainer from "./AspectRatioContainer";
import { formatPrice } from "@/helpers/formatPrice";
import { useEffect, useState } from "react";
import { addClass } from "@/helpers/addClass";
import { animateElementOnView } from "@/helpers/animateElementOnView";
import { autoAlpha } from "@/helpers/autoAlpha";

const showReel = (container, items) => {
  if (!items) return;

  items.forEach((item, index) => {
    animateElementOnView(container, addClass, 0.15, item, "reveal");
    item.style.transitionDelay = `${index * 0.1}s`;
  });
};

export default function ProductReel({ products, isLoading }) {
  useEffect(() => {
    if (!isLoading) {
      const items = document.querySelectorAll("#product_item");
      const container = document.querySelector("#product-reel_container");
      showReel(container, items);
      autoAlpha(items);
    }
  }, [isLoading]);

  return (
    <section
      className="relative w-full block my-20"
      id="product-reel_container"
    >
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
          {products.map((item, idx) => (
            <div className="flex flex-col relative" key={idx} id="product_item">
              <div
                className="relative mb-4"
                style={{
                  opacity: "1",
                  transition: "opacity .4s ease, transform .4s ease",
                }}
              >
                <div className="absolute right-2 top-2 z-[2] flex flex-col items-end">
                  {item.toOrder && (
                    <span className="text-darkBrown py-1 px-2 bg-snow text-xs">
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

                <div
                  className="grid"
                  style={{ gridTemplateColumns: "auto auto" }}
                >
                  <a
                    href="/"
                    className="mt-[1px] mr-[10px] mb-2 ml-0 h4 leading-[1.2]"
                  >
                    {item.name}
                  </a>
                  <div>
                    <div className="flex justify-end items-baseline flex-wrap">
                      <span className="text-sm md:text-[16px]">
                        ${formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex items-center"
                    style={{ gridColumn: "span 2" }}
                  >
                    <div className="h3 text-sm mr-[15px] text-lightBrown block mb-[6px]">
                      {item.type}
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
