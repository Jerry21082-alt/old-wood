export function debounce(func, wait) {
  let timeOut;

  return function (...args) {
    const context = this;
    clearTimeout(timeOut);
    timeOut = setTimeout(() => func.apply(context, args), wait);
  };
}
