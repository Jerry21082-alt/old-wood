import gsap from "gsap";

export const autoAlpha = (items) => {
  if (!items) return;

  items.forEach((item) => {
    const primaryImg = item.querySelector("#primary-img");
    const secondaryImg = item.querySelector("#secondary-img");

    gsap.set(secondaryImg, { autoAlpha: 0 });
    const handleMouseEnter = () => {
      gsap.to(primaryImg, { autoAlpha: 0, duration: 0.4 });
      gsap.to(secondaryImg, { autoAlpha: 1, duration: 0.4 }, "<");
    };

    const handleMouseLeave = () => {
      gsap.to(secondaryImg, { autoAlpha: 0, duration: 0.4 });
      gsap.to(primaryImg, { autoAlpha: 1, duration: 0.4 }, "<");
    };

    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      item.removeEventListener("mouseenter", handleMouseEnter);
      item.removeEventListener("mouseleave", handleMouseLeave);
    };
  });
};
