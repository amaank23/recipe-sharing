import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getCommentsByPostIdSlice = createSlice({
  name: "getCommentsByPostId",
  initialState,
  reducers: {
    getCommentsByPostId: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    getCommentsByPostIdSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getCommentsByPostIdFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const {
  getCommentsByPostId,
  getCommentsByPostIdSuccess,
  getCommentsByPostIdFailure,
} = getCommentsByPostIdSlice.actions;

export default getCommentsByPostIdSlice.reducer;
