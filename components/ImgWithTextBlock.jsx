"use client";

import { addClass } from "@/helpers/addClass";
import { animateElementOnView } from "@/helpers/animateElementOnView";
import { useEffect, useRef } from "react";

export default function ImgWithTextBlock({
  className = "",
  style = {},
  imgSrc = "",
  srcSet = "",
  imgAlt = "",
}) {
  const imgContainerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    animateElementOnView(
      imgContainerRef.current,
      addClass,
      0.1,
      imgRef.current,
      "reveal"
    );
  }, []);

  return (
    <div className={`${className}`} style={style} ref={imgContainerRef}>
      <img
        style={style}
        ref={imgRef}
        src={imgSrc}
        srcSet={srcSet}
        alt={imgAlt}
        className="w-full h-full object-cover object-center img-with_text-block"
        loading="lazy"
      />
    </div>
  );
}
