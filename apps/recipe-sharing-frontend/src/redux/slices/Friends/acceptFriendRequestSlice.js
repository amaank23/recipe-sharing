import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const acceptFriendRequestSlice = createSlice({
  name: "acceptFriendRequest",
  initialState,
  reducers: {
    acceptFriendRequest: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    acceptFriendRequestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    acceptFriendRequestFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const {
  acceptFriendRequest,
  acceptFriendRequestSuccess,
  acceptFriendRequestFailure,
} = acceptFriendRequestSlice.actions;

export default acceptFriendRequestSlice.reducer;
