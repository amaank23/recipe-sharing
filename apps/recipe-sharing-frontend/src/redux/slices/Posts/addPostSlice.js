import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const addPostSlice = createSlice({
  name: "addPost",
  initialState,
  reducers: {
    addPost: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    addPostSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    addPostFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { addPost, addPostSuccess, addPostFailure } = addPostSlice.actions;

export default addPostSlice.reducer;
