import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const rejectFriendRequestSlice = createSlice({
  name: "rejectFriendRequest",
  initialState,
  reducers: {
    rejectFriendRequest: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    rejectFriendRequestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    rejectFriendRequestFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const {
  rejectFriendRequest,
  rejectFriendRequestSuccess,
  rejectFriendRequestFailure,
} = rejectFriendRequestSlice.actions;

export default rejectFriendRequestSlice.reducer;
