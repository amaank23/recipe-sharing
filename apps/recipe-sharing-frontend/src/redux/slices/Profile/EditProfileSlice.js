import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const EditProfileSlice = createSlice({
  name: "EditProfile",
  initialState,
  reducers: {
    EditProfile: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    EditProfileSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    EditProfileFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { EditProfile, EditProfileSuccess, EditProfileFailure } =
  EditProfileSlice.actions;

export default EditProfileSlice.reducer;
