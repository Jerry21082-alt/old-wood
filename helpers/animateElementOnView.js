export const animateElementOnView = (element, func, threshold, ...args) => {
  if (!element) return;
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        func(...args);
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: threshold,
  });

  observer.observe(element);

  return () => observer.unobserve(element);
};
