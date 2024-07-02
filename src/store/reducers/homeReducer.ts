import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const get_category = createAsyncThunk("product/get_category", async (_, { fulfillWithValue }) => {
  try {
    const { data } = await api.get("/home/get-categories");
    // console.log(data);
    return fulfillWithValue(data);
  } catch (error) {
    console.log(error.response);
  }
});

export const get_products = createAsyncThunk("product/get_products", async (_, { fulfillWithValue }) => {
  try {
    const { data } = await api.get("/home/get-products");
    console.log(data);
    return fulfillWithValue(data);
  } catch (error) {
    console.log(error.response);
  }
});

export const price_range_product = createAsyncThunk("product/price_range_product", async (_, { fulfillWithValue }) => {
  try {
    const { data } = await api.get("/home/price-range-latest-product");
    console.log(data);
    return fulfillWithValue(data);
  } catch (error) {
    console.log(error.response);
  }
});

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categories: [],
    products: [],
    latestProduct: [],
    topRatedProduct: [],
    discountProduct: [],
    priceRange: {
      low: 0,
      high: 100,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_category.fulfilled, (state, { payload }) => {
        state.categories = payload.categories;
      })
      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.latestProduct = payload.latestProduct;
        state.topRatedProduct = payload.topRatedProduct;
        state.discountProduct = payload.discountProduct;
      })
      .addCase(price_range_product.fulfilled, (state, { payload }) => {
        state.latestProduct = payload.latestProduct;
        state.priceRange = payload.priceRange;
      });
  },
});

export default homeReducer.reducer;
