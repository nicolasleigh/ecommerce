import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

export const getAdminOrders = createAsyncThunk(
  "order/getAdminOrders",
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    successMessage: "",
    errorMessage: "",
    totalOrder: 0,
    order: {},
    myOrders: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminOrders.fulfilled, (state, { payload }) => {
      state.myOrders = payload.orders;
      state.totalOrder = payload.totalOrder;
    });
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
