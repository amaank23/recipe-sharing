import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getAllPostSlice = createSlice({
  name: "getAllPost",
  initialState,
  reducers: {
    getAllPost: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    getAllPostSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getAllPostFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { getAllPost, getAllPostSuccess, getAllPostFailure } =
  getAllPostSlice.actions;

export default getAllPostSlice.reducer;
