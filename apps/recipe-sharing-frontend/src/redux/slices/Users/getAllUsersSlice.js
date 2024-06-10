import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState,
  reducers: {
    getAllUsers: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getAllUsersFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { getAllUsers, getAllUsersSuccess, getAllUsersFailure } =
  getAllUsersSlice.actions;

export default getAllUsersSlice.reducer;
