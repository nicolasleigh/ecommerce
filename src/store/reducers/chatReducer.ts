import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const add_friend = createAsyncThunk("chat/add_friend", async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await api.post("/chat/customer/add-customer-friend", info);
    // console.log(data);
    return fulfillWithValue(data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const send_message = createAsyncThunk(
  "chat/send_message",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/chat/customer/send-message-to-seller", info);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    myFriends: [],
    friendMsg: [],
    currentFriend: "",
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }) => {
      state.friendMsg = [...state.friendMsg, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_friend.fulfilled, (state, { payload }) => {
        state.friendMsg = payload.messages;
        state.currentFriend = payload.currentFriend;
        state.myFriends = payload.myFriends;
      })
      .addCase(send_message.fulfilled, (state, { payload }) => {
        let tempFriends = state.myFriends;
        let index = tempFriends.findIndex((f) => f.friendId === payload.message.receiverId);
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.myFriends = tempFriends;
        state.friendMsg = [...state.friendMsg, payload.message];
        state.successMessage = "Message send successfully";
      });
  },
});

export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;
