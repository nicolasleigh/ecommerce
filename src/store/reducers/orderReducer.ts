import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const place_order = createAsyncThunk(
  "card/place_order",
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
    // builder
    //   .addCase(add_to_card.rejected, (state, { payload }) => {
    //     state.errorMessage = payload.error;
    //   })
    //   .addCase(add_to_card.fulfilled, (state, { payload }) => {
    //     state.successMessage = payload.message;
    //     state.cardProductCount = state.cardProductCount + 1;
    //   })
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
