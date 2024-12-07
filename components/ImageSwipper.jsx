"use client";

import { useState, useRef, useEffect } from "react";

export default function ImageSwipper({ productImgs }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleSwipe = (startX, endX) => {
    const swipeThreshold = 50; // Minimum swipe distance
    if (
      startX - endX > swipeThreshold &&
      currentIndex < productImgs.length - 1
    ) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (endX - startX > swipeThreshold && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dragDistance = Math.abs(e.clientX - startX.current);
    const newOpacity = Math.max(1 - dragDistance / 300, 0.1); // Dynamic opacity change
    setOpacity(newOpacity);
  };

  const handleMouseUp = (e) => {
    if (isDragging.current) {
      const endX = e.clientX;
      isDragging.current = false;
      handleSwipe(startX.current, endX);
      setOpacity(1); // Reset opacity
    }
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const dragDistance = Math.abs(e.touches[0].clientX - startX.current);
    const newOpacity = Math.max(1 - dragDistance / 300, 0.1); // Dynamic opacity change
    setOpacity(newOpacity);
  };

  const handleTouchEnd = (e) => {
    if (isDragging.current) {
      const endX = e.changedTouches[0].clientX;
      isDragging.current = false;
      handleSwipe(startX.current, endX);
      setOpacity(1); // Reset opacity
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className="overflow-hidden bg-milk relative block mx-auto pointer-events-auto text-center cursor-grab"
      style={{ aspectRatio: "0.75", userSelect: "none" }}
      onMouseDown={handleMouseDown}
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
          transition: "opacity 0.1s ease-in-out", // Smooth opacity change
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
