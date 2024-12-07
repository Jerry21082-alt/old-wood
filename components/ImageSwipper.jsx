"use client";

import { useState } from "react";

export default function ImageSwipper({ productImgs }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const handleSwipe = (startX, endX) => {
    if (startX - endX > 50 && currentIndex < productImgs.length - 1) {
      // Swipe left
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (endX - startX > 50 && currentIndex > 0) {
      // Swipe right
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  let touchStartX = 0;
  let touchMoveX = 0;

  const handleTouchMove = (e) => {
    touchMoveX = e.touches[0].clientX;
    const dragDistance = Math.abs(touchMoveX - touchStartX);
    const newOpacity = Math.max(1 - dragDistance / 300, 0.3); // Adjust sensitivity here
    setOpacity(newOpacity);
  };

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX; // Capture start position
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX; // Capture end position
    handleSwipe(touchStartX, touchEndX); // Determine swipe direction
    setOpacity(1); // Reset opacity after swipe
  };

  return (
    <div
      className="overflow-hidden bg-milk relative block mx-auto pointer-events-auto text-center cursor-grab"
      style={{ aspectRatio: "0.75", userSelect: "none" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={productImgs[currentIndex].src}
        srcSet={productImgs[currentIndex].srcSet}
        alt={productImgs[currentIndex].alt}
        loading="lazy"
        style={{
          opacity,
          transition: "opacity 0.3s ease-in-out", // Smooth opacity transition
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensure the image fits well
        }}
        className="flickity"
      />
    </div>
  );
}
