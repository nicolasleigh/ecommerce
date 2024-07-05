import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const place_order = createAsyncThunk(
  "order/place_order",
  async ({ price, products, shippingFee, items, userId, navigate, shippingInfo }) => {
    try {
      const { data } = await api.post("/home/order/place-order", {
        price,
        products,
        shippingFee,
        items,
        userId,
        navigate,
        shippingInfo,
      });
      navigate("/payment", {
        state: {
          price: price + shippingFee,
          items,
          orderId: data.orderId,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const get_orders = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-orders/${customerId}/${status}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    myOrder: {},
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_orders.fulfilled, (state, { payload }) => {
      state.myOrders = payload.orders;
    });
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
