import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getUserByIdSlice = createSlice({
  name: "getUserById",
  initialState,
  reducers: {
    getUserById: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    getUserByIdSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getUserByIdFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { getUserById, getUserByIdSuccess, getUserByIdFailure } =
  getUserByIdSlice.actions;

export default getUserByIdSlice.reducer;
