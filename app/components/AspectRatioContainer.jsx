import { useEffect, useRef } from "react";

export default function AspectRatioContainer({
  children,
  aspectRatio = 1 / 1,
  className,
}) {
  const containerRef = useRef(null);
  const container = containerRef.current;

  useEffect(() => {
    function handleResize() {
      if (container) {
        const content = container.querySelector(".content");
        if (containerRef) {
          const containerWidth = container.clientWidth;
          content.style.height = `${containerWidth * (1 / aspectRatio)}px`;
        }
      }
    }
    if (containerRef.current) handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [aspectRatio]);

  return (
    <div ref={containerRef} className={className}>
      <div className="content">{children}</div>
    </div>
  );
}
