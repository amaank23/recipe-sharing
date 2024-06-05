import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const verifyUserSlice = createSlice({
  name: "verifyUser",
  initialState,
  reducers: {
    verifyUser: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    verifyUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    verifyUserFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { verifyUser, verifyUserSuccess, verifyUserFailure } =
  verifyUserSlice.actions;

export default verifyUserSlice.reducer;
