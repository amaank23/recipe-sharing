import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const commentOnPostSlice = createSlice({
  name: "commentOnPost",
  initialState,
  reducers: {
    commentOnPost: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    commentOnPostSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    commentOnPostFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { commentOnPost, commentOnPostSuccess, commentOnPostFailure } =
  commentOnPostSlice.actions;

export default commentOnPostSlice.reducer;
