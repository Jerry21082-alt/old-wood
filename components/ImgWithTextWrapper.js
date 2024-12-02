"use client";

import { addClass } from "@/helpers/addClass";
import { animateElementOnView } from "@/helpers/animateElementOnView";
import { useEffect, useRef } from "react";

export default function ImgWithTextWrapper({
  className = "",
  src = "",
  srcSet = "",
  alt = "",
  style = {},
}) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    animateElementOnView(
      containerRef.current,
      addClass,
      0.1,
      imgRef.current,
      "reveal"
    );
  }, []);

  return (
    <div className={`${className}`} ref={containerRef}>
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        alt={alt}
        className="relative block z-[1] w-full h-auto max-w-full img-with_text-wrapper"
        style={style}
      ></img>
    </div>
  );
}
