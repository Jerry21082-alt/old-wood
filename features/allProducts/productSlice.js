// import { allItems } from "@/constants/shuffleAllProducts";
import { shuffledProducts } from "@/constants/shuffleAllProducts";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: shuffledProducts,
};

const productSlice = createSlice({
  name: "allProduct",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
