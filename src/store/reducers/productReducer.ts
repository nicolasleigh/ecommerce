import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

export const productAdd = createAsyncThunk(
  "product/productAdd",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-add", product, { withCredentials: true });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/products-get?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product-get/${productId}`, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/product-update`, product, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    products: [],
    product: "",
    totalProduct: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productAdd.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(productAdd.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(productAdd.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.totalProduct = payload.totalProduct;
        state.products = payload.products;
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.product = payload.product;
      })
      .addCase(updateProduct.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.product = payload.product;
        state.successMessage = payload.message;
      });
  },
});

export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
