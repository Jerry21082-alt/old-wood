"use client";

import { useState } from "react";

export default function ImageSwipper({ productImgs }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const handleSwipe = (startX, endX) => {
    if (startX - endX > 50 && currentIndex < productImgs.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (endX - startX > 50 && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  let touchStartX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    handleSwipe(touchStartX, touchEndX);
    setOpacity(1);
  };
  return (
    <div
      className="overflow-hidden bg-milk relative block mx-auto pointer-events-auto text-center cursor-grab"
      style={{ aspectRatio: "0.75", userSelect: "none", opacity }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {productImgs.map((_, index) => (
        <img
          key={index}
          src={productImgs[currentIndex].src}
          srcSet={productImgs[currentIndex].srcSet}
          alt={productImgs[currentIndex].alt}
          loading="lazy"
          className={`flickity`}
        />
      ))}
    </div>
  );
}
