import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    loginUserFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { loginUser, loginUserSuccess, loginUserFailure } =
  loginUserSlice.actions;

export default loginUserSlice.reducer;
