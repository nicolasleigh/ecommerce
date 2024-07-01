import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categories: [],
  },
  reducers: {},
  extraReducers: () => {},
});

export default homeReducer.reducer;
