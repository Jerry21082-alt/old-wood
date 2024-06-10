import React, { useEffect, useRef } from "react";

export default function AspectRatioContainer({
  aspectRatio = 11 / 9,
  children,
  className,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      const container = containerRef.current;
      if (container) {
        const content = container.querySelector(".aspect-ratio-content");
        if (content) {
          const containerWidth = container.offsetWidth;
          content.style.height = `${containerWidth * (1 / aspectRatio)}px`;
        }
      }
    }

    window.addEventListener("resize", handleResize);

    if (containerRef.current) handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [aspectRatio]);
  return (
    <div className={`${className}`} ref={containerRef}>
      <div className="aspect-ratio-content">{children}</div>
    </div>
  );
}
