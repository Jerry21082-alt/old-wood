export const formatPrice = (price, decimalPlace = 2, seperator = ",") => {
  const parts = price.toFixed(decimalPlace).toString().split(".");
  let formatedPrice = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, seperator);

  if (formatPrice > 0) {
    formatedPrice += "." + parts[1];
  }

  return formatedPrice;
};
