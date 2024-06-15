"use client";

import AspectRatioContainer from "@/app/components/AspectRatioContainer";
import Drawer from "@/app/components/Drawer";
import { productReelItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Product_Page({ params }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

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
              <Drawer color="#5e3519" borderColor="#A5A097" title="Description">
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
              <Drawer color="#5e3519" borderColor="#A5A097" title="Dimension">
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
              <Drawer color="#5e3519" borderColor="#A5A097" title="Customize">
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
                    </div>
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
