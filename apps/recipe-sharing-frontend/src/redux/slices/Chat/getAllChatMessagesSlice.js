import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getAllChatMessagesSlice = createSlice({
  name: "getAllChatMessages",
  initialState,
  reducers: {
    getAllChatMessages: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    getAllChatMessagesSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getAllChatMessagesFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const {
  getAllChatMessages,
  getAllChatMessagesSuccess,
  getAllChatMessagesFailure,
} = getAllChatMessagesSlice.actions;

export default getAllChatMessagesSlice.reducer;
