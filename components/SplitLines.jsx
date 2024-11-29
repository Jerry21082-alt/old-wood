"use client";

import { addClass } from "@/helpers/addClass";
import { animateElementOnView } from "@/helpers/animateElementOnView";
import { useEffect, useRef } from "react";

export default function SplitLines({ text1, text2, ...args }) {
  const textContainerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      animateElementOnView(
        textRef.current,
        addClass,
        0.1,
        textRef.current,
        "reveal"
      );
    }
  }, []);

  return (
    <div className="overflow-hidden" ref={textContainerRef}>
      <p className="animated--text" ref={textRef}>
        <span {...args}>{text1}</span>
        <span {...args}>{text2}</span>
      </p>
    </div>
  );
}
