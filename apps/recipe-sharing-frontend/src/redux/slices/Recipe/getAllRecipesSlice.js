import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getAllRecipesSlice = createSlice({
  name: "getAllRecipes",
  initialState,
  reducers: {
    getAllRecipes: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    getAllRecipesSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getAllRecipesFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { getAllRecipes, getAllRecipesSuccess, getAllRecipesFailure } =
  getAllRecipesSlice.actions;

export default getAllRecipesSlice.reducer;
