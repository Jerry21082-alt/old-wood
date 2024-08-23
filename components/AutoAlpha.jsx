import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AutoAlpha({ children, ...props }) {
  useEffect(() => {
    const items = gsap.utils.toArray("#product_item");

    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 1.2,
        scrollTrigger: {
          trigger: items,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
          once: true,
          toggleActions: "play none none none",
        },
      }
    );

    items.forEach((item) => {
      const primaryImage = item.querySelector("#primary-img");
      const secondaryImage = item.querySelector("#secondary-img");

      gsap.set(secondaryImage, { autoAlpha: 0 });
      item.addEventListener("mouseenter", () => {
        gsap.to(primaryImage, { autoAlpha: 0, duration: 0.4 });
        gsap.to(secondaryImage, { autoAlpha: 1, duration: 0.4 });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(primaryImage, { autoAlpha: 1, duration: 0.4 });
        gsap.to(secondaryImage, { autoAlpha: 0, duration: 0.4 });
      });
    });
  }, []);

  return (
    <div>
      <div id="#product_item" {...props}>
        {children}
      </div>
    </div>
  );
}
