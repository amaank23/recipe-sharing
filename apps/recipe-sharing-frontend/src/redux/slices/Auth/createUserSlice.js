import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    createUser: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { createUser, createUserSuccess, createUserFailure } =
  createUserSlice.actions;

export default createUserSlice.reducer;
