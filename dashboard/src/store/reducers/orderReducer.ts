import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

export const getAdminOrders = createAsyncThunk(
  "order/getAdminOrders",
  async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/orders?page=${page}&searchValue=${searchValue}&perPage=${perPage}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAdminOrder = createAsyncThunk(
  "order/getAdminOrder",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/order/${orderId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminOrderStatusUpdate = createAsyncThunk(
  "order/adminOrderStatusUpdate",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/admin/order-status/update/${orderId}`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSellerOrders = createAsyncThunk(
  "order/getSellerOrders",
  async ({ perPage, page, searchValue, sellerId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/seller/orders/${sellerId}?page=${page}&searchValue=${searchValue}&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllOrders = createAsyncThunk("order/getAllOrders", async (_, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await api.get(`/seller/all-orders`, {
      withCredentials: true,
    });
    return fulfillWithValue(data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getLatestOrders = createAsyncThunk(
  "order/getLatestOrders",
  async (limit, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/latest-orders/${limit}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDashboardStats = createAsyncThunk(
  "order/getDashboardStats",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/dashboard-stats`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSellerOrder = createAsyncThunk(
  "order/getSellerOrder",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/order/${orderId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPaymentStats = createAsyncThunk(
  "order/getPaymentStats",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/order-stats`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerOrderStatusUpdate = createAsyncThunk(
  "order/sellerOrderStatusUpdate",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/seller/order-status/update/${orderId}`, info, {
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
    allOrders: [],
    latestOrders: [],
    paymentStats: {
      unpaidStats: 0,
      paidStats: 0,
      refundStats: 0,
      refundRate: 0,
    },
    dashboardStats: {
      unpaidStats: 0,
      paidStats: 0,
      productCount: 0,
      customerCount: 0,
      orderCount: 0,
    },
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminOrders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })
      .addCase(getAdminOrder.fulfilled, (state, { payload }) => {
        state.order = payload.order;
      })
      .addCase(adminOrderStatusUpdate.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
      })
      .addCase(adminOrderStatusUpdate.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(getSellerOrders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        state.allOrders = payload.orders;
      })
      .addCase(getSellerOrder.fulfilled, (state, { payload }) => {
        state.order = payload.order;
      })
      .addCase(getLatestOrders.fulfilled, (state, { payload }) => {
        state.latestOrders = payload.latestOrders;
      })
      .addCase(getPaymentStats.fulfilled, (state, { payload }) => {
        state.paymentStats.unpaidStats = payload.unpaidStats;
        state.paymentStats.paidStats = payload.paidStats;
        state.paymentStats.refundStats = payload.refundStats;
        state.paymentStats.refundRate = payload.refundRate;
      })
      .addCase(getDashboardStats.fulfilled, (state, { payload }) => {
        state.dashboardStats.unpaidStats = payload.unpaidStats;
        state.dashboardStats.paidStats = payload.paidStats;
        state.dashboardStats.productCount = payload.productCount;
        state.dashboardStats.customerCount = payload.customerCount;
        state.dashboardStats.orderCount = payload.orderCount;
      })

      .addCase(sellerOrderStatusUpdate.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
      })
      .addCase(sellerOrderStatusUpdate.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      });
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
