import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const addRecipeSlice = createSlice({
  name: "addRecipe",
  initialState,
  reducers: {
    addRecipe: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    addRecipeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    addRecipeFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { addRecipe, addRecipeSuccess, addRecipeFailure } =
  addRecipeSlice.actions;

export default addRecipeSlice.reducer;
