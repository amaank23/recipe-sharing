import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const likeUnlikePostSlice = createSlice({
  name: "likeUnlikePost",
  initialState,
  reducers: {
    likeUnlikePost: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    likeUnlikePostSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    likeUnlikePostFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { likeUnlikePost, likeUnlikePostSuccess, likeUnlikePostFailure } =
  likeUnlikePostSlice.actions;

export default likeUnlikePostSlice.reducer;
