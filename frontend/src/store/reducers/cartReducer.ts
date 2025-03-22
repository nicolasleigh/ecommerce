import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const add_to_cart = createAsyncThunk("cart/add_to_cart", async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await api.post("/home/product/add-to-cart", info);
    console.log(data);
    return fulfillWithValue(data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const get_cart_products = createAsyncThunk(
  "cart/get_cart_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product/get-cart-product/${userId}`);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_cart_product = createAsyncThunk(
  "cart/delete_cart_product",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/home/product/delete-cart-product/${id}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_increment = createAsyncThunk(
  "cart/quantity_increment",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-increment/${id}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_decrement = createAsyncThunk(
  "cart/quantity_decrement",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-decrement/${id}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/home/product/add-to-wishlist`, info);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_wishlist_products = createAsyncThunk(
  "wishlist/get_wishlist_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product/get-wishlist-products/${userId}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const remove_wishlist = createAsyncThunk(
  "wishlist/remove_wishlist",
  async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/home/product/remove-wishlist-product/${wishlistId}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    cartProductCount: 0,
    wishlistCount: 0,
    wishlist: [],
    price: 0,
    errorMessage: "",
    successMessage: "",
    shippingFee: 0,
    outOfStockProducts: [],
    buyProductItem: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    resetCount: (state, _) => {
      state.cartProductCount = 0;
      state.wishlistCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_to_cart.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })
      .addCase(add_to_cart.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.cartProductCount = state.cartProductCount + 1;
      })
      .addCase(get_cart_products.fulfilled, (state, { payload }) => {
        state.cartProducts = payload.cartProducts;
        state.price = payload.price;
        state.cartProductCount = payload.cartProductCount;
        state.shippingFee = payload.shippingFee;
        state.outOfStockProducts = payload.outOfStockProducts;
        state.buyProductItem = payload.buyProductItem;
      })
      .addCase(delete_cart_product.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(quantity_increment.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(quantity_decrement.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(add_to_wishlist.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })
      .addCase(add_to_wishlist.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.wishlistCount = state.wishlistCount > 0 ? state.wishlistCount + 1 : 1;
      })
      .addCase(get_wishlist_products.fulfilled, (state, { payload }) => {
        state.wishlist = payload.wishlists;
        state.wishlistCount = payload.wishlistCount;
      })
      .addCase(remove_wishlist.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.wishlist = state.wishlist.filter((p) => p._id !== payload.wishlistId);
        state.wishlistCount = state.wishlistCount - 1;
      });
  },
});

export const { messageClear, resetCount } = cartReducer.actions;
export default cartReducer.reducer;
