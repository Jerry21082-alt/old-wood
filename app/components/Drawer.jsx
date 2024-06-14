import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Drawer({ children, title, delay }) {
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
    <li className="flow-root border-b border-listBorder" onClick={toggleDrawer}>
      <button
        aria-expanded="false"
        className="flex items-center justify-between py-[21px] px-6 w-full text-xs"
      >
        <Link
          href="/"
          style={{ transitionDelay: delay }}
          className="animate-link"
        >
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
