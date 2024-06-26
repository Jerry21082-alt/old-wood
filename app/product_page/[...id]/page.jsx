"use client";

import AspectRatioContainer from "@/components/AspectRatioContainer";
import Drawer from "@/components/Drawer";
import { productReelItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Product_Page({ params }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const scrollRef = useRef(null);

  const { id } = params;
  const [productId] = id;

  const product = productReelItems.find((item) => item.id == productId);

  const showSlide = (idx) => {
    const totalSlides = slides.length;
    if (idx >= totalSlides) {
      setCurrentIndex(0);
    } else if (idx < 0) {
      setCurrentIndex(slides.length - 1);
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

  const handleSlideClick = (index) => {
    setCurrentIndex(index);
  };

  const handleScrollLeft = () => {
    const current = scrollRef.current;
    if (current) current.scrollLeft -= 50;
  };

  const handleScrollRight = () => {
    const current = scrollRef.current;
    if (current) current.scrollLeft += 50;
  };

  return (
    <section className="mt-24">
      <div className="max-w-[1600px] w-full px-6">
        <div className="mt-6 mb-9 pt-6">
          <AspectRatioContainer
            className="w-full overflow-hidden"
            aspectRatio={3 / 4}
          >
            <div
              className="flex w-full h-full"
              style={{
                transform: `translateX(${-currentIndex * 100}%)`,
                transition: "transform .5s ease-in-out",
              }}
              onTouchEnd={handleTouchEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              {product.allImages.map((img, idx) => (
                <div
                  className="min-w-full box-border flex items-center h-full"
                  key={idx}
                >
                  <Image
                    src={img}
                    width={500}
                    height={500}
                    className="object-cover object-center"
                    alt="product-image"
                  />
                </div>
              ))}
            </div>
          </AspectRatioContainer>

          <div className="w-full flex items-center justify-center mt-4">
            {product.allImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className="rounded-full h-3 w-3 ml-3"
                style={{
                  backgroundColor: currentIndex === idx ? "#221f20" : "#a5a097",
                  transition: "background-color .4s ease-in-out",
                }}
                onClick={() => handleSlideClick(idx)}
              ></button>
            ))}
          </div>
        </div>
        <div className="mt-7 w-full">
          <div className="my-7">
            <h1 className="h2 text-2xl my-2">Sabi Sectional</h1>
            <div className="text-lightBrown text-sm h3">{product.type}</div>
          </div>

          <div className="w-full">
            <div className="border-darkGray border-t w-full">
              <Drawer color="#221f20" borderColor="#A5A097" title="Description">
                <div
                  className="pb-6 transition-all"
                  style={{ transitionDuration: ".25s ease" }}
                >
                  <div>
                    <p className="text-sm">
                      The sabi sectional was designed to fill the room. She
                      features a pared-down, rounded silhouette reminiscent of a
                      woman’s exposed shoulder. With a seat depth of 25.75", the
                      nine-foot sectional comfortably seats six to seven people.
                      She’s the perfect piece for a large-scale entertaining
                      space.
                    </p>
                    <p>Shown upholstered in our olive fabric.</p>
                    <p className="mt-4 text-sm">
                      <span>Shown upholstered in our olive fabric.</span>
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
                    <p>
                      <Link
                        href="/"
                        className="text-xs uppercase text-darkBrown shop-button relative"
                      >
                        Tearsheet
                      </Link>
                    </p>
                    <p className="my-6 text-darkGray text-sm">Overall</p>
                    <ul className="flex flex-col space-y-1">
                      <li className="px-1 text-darkGray">
                        {`width: ${product.dimensions.width} in`}
                      </li>
                      <li className="px-1 text-darkGray">
                        {`Length: ${product.dimensions.length} in`}
                      </li>
                      <li className="px-1 text-darkGray">
                        {`Depth: ${product.dimensions.depth} in`}
                      </li>
                      <li className="px-1 text-darkGray">
                        {`Height: ${product.dimensions.height} in`}
                      </li>
                      <li className="px-1 text-darkGray">
                        {`Seat Height: ${product.dimensions.seatHeight} in`}
                      </li>
                      <li className="px-1 text-darkGray">
                        {`Seat Depth: ${product.dimensions.seatDepth} in`}
                      </li>
                      <li className="px-1 text-darkGray">
                        {`Arm Height: ${product.dimensions.ArmHeight} in`}
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
                      <span className="text-sm text-darkBrown ml-6">Sand</span>

                      <div className="ml-4">
                        <Link
                          href="/"
                          className=" text-sm text-darkBrown relative"
                        >
                          <span className="detail-link relative">Details</span>
                        </Link>
                      </div>

                      <div className="fabric-grid"></div>
                    </div>
                  </div>
                </div>
              </Drawer>
            </div>

            <div className="mt-6">
              <span className="text-lightBrown">${product.price}</span>
            </div>

            <div className="flex mt-6">
              <div className="w-4 h-4 rounded-full border-darkBrown border"></div>
              <span className="block text-sm ml-2 max-w-[70vw]">
                I agree to the Old Wood terms and conditions
              </span>
            </div>

            <div className="flex items-center w-full mt-2">
              <div className="w-28 h-12 p-3 flex items-center border border-listBorder">
                <div className="flex justify-between items-center w-full">
                  <button type="button">
                    <svg
                      focusable="false"
                      width="10"
                      height="2"
                      viewBox="0 0 10 2"
                    >
                      <path filter="#5e3519" d="M0 0h10v2H0z"></path>
                    </svg>
                  </button>

                  <span>{1}</span>

                  <button type="button">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                    >
                      <title>plus</title>
                      <path d="M16 10c0 0.553-0.048 1-0.601 1h-4.399v4.399c0 0.552-0.447 0.601-1 0.601s-1-0.049-1-0.601v-4.399h-4.399c-0.552 0-0.601-0.447-0.601-1s0.049-1 0.601-1h4.399v-4.399c0-0.553 0.447-0.601 1-0.601s1 0.048 1 0.601v4.399h4.399c0.553 0 0.601 0.447 0.601 1z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex-1 ml-4">
                <button
                  className="w-full uppercase py-3 px-3 bg-lightBrown text-milk"
                  type="button"
                >
                  <span className="text-sm">Add to cart</span>
                </button>
              </div>
            </div>

            <div className="bg-milk p-5 text-sm mt-4">
              <span>
                Kindly allow 10-12 weeks lead time for production and additional
                2 weeks for shipping. Thank you.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flow-root mt-11 px-6">
        <header>
          <h3 className="capitalize h2 text-xl border-t border-listBorder pt-7">
            More about this item
          </h3>
        </header>
      </div>

      <div className="px-6 w-full">
        <div className="mt-6 overflow-y-hidden overflow-x-auto" ref={scrollRef}>
          <div className="min-w-full w-max">
            <div className="scroll-grid border-y border-listBorder">
              <button type="button" className="pr-7" onClick={handleScrollLeft}>
                <span className="text-[12px] uppercase">store</span>
              </button>
              <button type="button" className="pr-7">
                <span className="text-[12px] uppercase">product care</span>
              </button>
              <button type="button" onClick={handleScrollRight}>
                <span className="text-[12px] uppercase">shipping & return</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <div className="w-full px-6">
          <div
            className="pb-[30px] border-b border-listBorder w-full overflow-y-hidden overflow-x-auto block"
            style={{ scrollSnapType: "x mandatory" }}
          >
            <div className="scroll-item-grid">
              <div className="flex flex-wrap w-full gap-2">
                <div className="max-w-full">
                  <div className="flex flex-wrap content-between py-10 pr-6 pl-1 timeline_content relative">
                    <div className="pb-7 w-full">
                      <h5 className="text-darkBrown text-sm mb-7">
                        New Vintage
                      </h5>
                      <p>
                        Designs inspired by everyday life, our New Vintage items
                        are made for the home. Antique elements are paired with
                        luxurious interior upholstery and organic fabrics. Our
                        New Vintage pieces are made by hand from master
                        craftsmen and uphosterers with generations worth of
                        knowledge.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="timeline_image_wrapper">
                  <Image
                    src="/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg"
                    width={500}
                    height={500}
                    alt="product-img"
                    className="max-w-full h-auto"
                  />
                </div>
              </div>

              <div className="flex flex-wrap w-full gap-2">
                <div className="max-w-full">
                  <div className="flex flex-wrap content-between py-10 pr-6 pl-1 timeline_content relative">
                    <div className="pb-7 w-full">
                      <h5 className="text-sm mb-7 uppercase">
                        caring for this item
                      </h5>
                      <p>
                        All soft goods including sofa cushions and slipcovers
                        are recommended dry clean only. Do not machine wash
                      </p>

                      <p className="mt-6">
                        You may use a steamer on medium to remove wrinkles. Do
                        not iron.
                      </p>

                      <p className="mt-6">
                        Our fabrics are organic in nature which allows for
                        movement. If you find your tight back sofa is wrinkling,
                        a simple swipe of the hand and fabric tuck in the arm
                        will remove those lines. Our cushion internals will
                        settle and loosen over time. To keep them fresh, simply
                        fluff and pat to organize the contents.
                      </p>

                      <p className="mt-6">
                        Remove stains immediately. If you must, use a damp cloth
                        to pat out the stain, do not rub. Never use harsh
                        chemicals to remove stains. For persistent stains,
                        contact a professional fabric cleaning company.
                      </p>

                      <p className="mt-6">
                        It’s important to remember when purchasing items
                        upholstered in fabric with higher piles, variations in
                        texture will be highlighted. These fabrics are luxurious
                        and pile inconsistencies are not a flaw but should be
                        embraced. It is not uncommon for these fabrics to crush
                        and distort over time with use. We use these fabrics
                        often in our designs and cherish their unique qualities.
                      </p>

                      <p className="mt-6">
                        To keep these fabrics looking young, it’s recommended to
                        use a velvet brush or vacuum with an upholstery
                        attachment to reorganize the pile as you desire.
                      </p>

                      <p className="mt-6">Do not steam or iron shearling.</p>

                      <p className="mt-6">
                        For small leather stains, use a leather cleaner and
                        microfiber cloth.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="timeline_image_wrapper">
                  <div className="timeline_image_wrapper">
                    <Image
                      src="/Still_Life-Pavilion_Chair_2557_RESIZED_FOR_TRADE_PAGE.jpg"
                      width={500}
                      height={500}
                      alt="product-img"
                      className="max-w-full h-auto"
                    />
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
