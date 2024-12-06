"use client";

import { useState } from "react";

export default function ImageSwipper({ productImgs }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
  };
  return (
    <div
      className="overflow-hidden bg-milk relative block mx-auto pointer-events-auto text-center cursor-grab"
      style={{ aspectRatio: "0.75", userSelect: "none" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {productImgs.map((img, index) => (
        <img
          key={index}
          src={img.src}
          srcSet={img.srcSet}
          alt={img.alt}
          loading="lazy"
        />
      ))}
    </div>
  );
}
