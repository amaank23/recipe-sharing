import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const sendMessageSlice = createSlice({
  name: "sendMessage",
  initialState,
  reducers: {
    sendMessage: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    sendMessageSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    sendMessageFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { sendMessage, sendMessageSuccess, sendMessageFailure } =
  sendMessageSlice.actions;

export default sendMessageSlice.reducer;
