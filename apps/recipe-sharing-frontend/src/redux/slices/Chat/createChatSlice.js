import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const createChatSlice = createSlice({
  name: "createChat",
  initialState,
  reducers: {
    createChat: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    createChatSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    createChatFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { createChat, createChatSuccess, createChatFailure } =
  createChatSlice.actions;

export default createChatSlice.reducer;
