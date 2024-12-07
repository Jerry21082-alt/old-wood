"use client";

import { useState, useRef, useEffect } from "react";

export default function FlickityCarousel({ productImgs }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleSwipe = (startX, endX) => {
    const swipeThreshold = 50;
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
    const newOpacity = Math.max(1 - dragDistance / 300, 0.1);
    setOpacity(newOpacity);
  };

  const handleMouseUp = (e) => {
    if (isDragging.current) {
      const endX = e.clientX;
      isDragging.current = false;
      handleSwipe(startX.current, endX);
      setOpacity(1);
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
      setOpacity(1);
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
    <div className="block md:hidden w-full" style={{ position: "unset" }}>
      <div className="max-w-[1500px] relative mx-auto">
        <div
          className="text-center min-w-full relative overflow-visible"
          style={{
            marginLeft: "calc(-1* 24px)",
            marginRight: "calc(-1* 24px)",
            userSelect: "none",
          }}
        >
          <div className="h-[436px] touch-pan-y cursor-grab relative overflow-hidden w-full">
            <div
              className="absolute w-full h-full left-0"
              style={{ transform: "translateX(188px)" }}
            >
              <div
                className="absolute left-0 z-[1] px-6 text-center min-w-full cursor-grab w-full block"
                style={{
                  userSelect: "none",
                  transition: "visibility .2s linear",
                  transform: "translateX(-187px)",
                }}
              >
                <div
                  className="overflow-hidden bg-milk relative block mx-auto pointer-events-auto text-center cursor-grab"
                  style={{ aspectRatio: "0.75", userSelect: "none", opacity }}
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
                      transition: "opacity 0.1s ease-in-out",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-nowrap w-full items-center mt-[18px] relative justify-center">
            <div className="flex items-center justify-center px-[20px] m-[-6px] flex-nowrap">
              {productImgs.map((_, index) => (
                <button
                  onClick={() => setCurrentIndex(index)}
                  key={index}
                  className="relative m-[6px] h-[12px] w-[12px] rounded-full"
                  style={{
                    backgroundColor:
                      currentIndex === index ? "rgb(34, 31, 32)" : "grey",
                    transition: "background-color .3s ease-in-out",
                  }}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
