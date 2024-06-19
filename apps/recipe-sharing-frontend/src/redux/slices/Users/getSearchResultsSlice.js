import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getSearchResultsSlice = createSlice({
  name: "getSearchResults",
  initialState,
  reducers: {
    getSearchResults: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    getSearchResultsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getSearchResultsFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const {
  getSearchResults,
  getSearchResultsSuccess,
  getSearchResultsFailure,
} = getSearchResultsSlice.actions;

export default getSearchResultsSlice.reducer;
