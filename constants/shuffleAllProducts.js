import { furnitureCollection } from "./furniture";
import { productReelItems } from ".";

const allProducts = [...productReelItems, ...furnitureCollection];

const shuffleAllProducts = (array) => {
  const emptyArray = [];

  while (emptyArray.length < array.length) {
    const j = Math.floor(Math.random() * array.length);
    const randomItem = array[j];

    if (!emptyArray.includes(randomItem)) {
      emptyArray.push(randomItem);
    }
  }

  return emptyArray;
};

export const shuffledProducts = shuffleAllProducts(allProducts);
