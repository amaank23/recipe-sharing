import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getAllPostsByIdsByIdSlice = createSlice({
  name: "getAllPostsById",
  initialState,
  reducers: {
    getAllPostsById: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    getAllPostsByIdSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getAllPostsByIdFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const {
  getAllPostsById,
  getAllPostsByIdSuccess,
  getAllPostsByIdFailure,
} = getAllPostsByIdsByIdSlice.actions;

export default getAllPostsByIdsByIdSlice.reducer;
