"use client";

// import { addClass } from "@/helpers/addClass";
// import { animateElementOnView } from "@/helpers/animateElementOnView";
import { useEffect, useRef, useState } from "react";

export default function FadeText({ text, className = "", threshold = 0.1 }) {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleObserver = (enteries, observer) => {
      enteries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      threshold,
    });

    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <p
      className={`fade-text inline ${className} ${isVisible ? "in" : ""}`}
      ref={textRef}
    >
      {text}
    </p>
  );
}
