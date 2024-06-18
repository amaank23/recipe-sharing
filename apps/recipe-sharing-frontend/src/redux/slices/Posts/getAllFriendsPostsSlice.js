import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getAllFriendsPostsSlice = createSlice({
  name: "getAllFriendsPosts",
  initialState,
  reducers: {
    getAllFriendsPosts: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    getAllFriendsPostsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getAllFriendsPostsFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const {
  getAllFriendsPosts,
  getAllFriendsPostsSuccess,
  getAllFriendsPostsFailure,
} = getAllFriendsPostsSlice.actions;

export default getAllFriendsPostsSlice.reducer;
