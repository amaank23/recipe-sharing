import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess: (state, action) => {
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.isAuth = true;
      state.user = action.payload.user;
      state.loading = false;
    },
    authFailure: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.isAuth = false;
      state.user = null;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { authSuccess, authFailure, setUser } = authSlice.actions;

export default authSlice.reducer;
