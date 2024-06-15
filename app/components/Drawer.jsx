import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Drawer({
  children,
  title,
  delay,
  color,
  borderColor,
  padding,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentRef = useRef(null);
  const drawerContent = contentRef.current;

  useEffect(() => {
    if (isOpen) {
      setHeight(drawerContent.scrollHeight);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  const toggleDrawer = () => setIsOpen((previousState) => !previousState);

  const handleTransitionEnd = () => {
    if (isOpen) {
      drawerContent.style.maxHeight = `auto`;
    }
  };

  return (
    <li className="flow-root border-b" style={{ borderColor: borderColor }}>
      <button
        aria-expanded="false"
        className={`flex items-center justify-between py-[21px] px-${padding} w-full text-xs animate-link`}
        style={{ transitionDelay: delay }}
        onClick={toggleDrawer}
      >
        <Link href="/" style={{ color: color }}>
          {title}
        </Link>
        <span
          className={`w-[14px] h-[14px] plus-icon relative ${
            isOpen ? "animate-plus" : ""
          }`}
        ></span>
      </button>
      <div
        className={`drawer ${isOpen ? "open" : "close"}`}
        ref={contentRef}
        style={{
          maxHeight: height,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </div>
    </li>
  );
}
