import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const sendFriendRequestSlice = createSlice({
  name: "sendFriendRequest",
  initialState,
  reducers: {
    sendFriendRequest: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    sendFriendRequestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    sendFriendRequestFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const {
  sendFriendRequest,
  sendFriendRequestSuccess,
  sendFriendRequestFailure,
} = sendFriendRequestSlice.actions;

export default sendFriendRequestSlice.reducer;
