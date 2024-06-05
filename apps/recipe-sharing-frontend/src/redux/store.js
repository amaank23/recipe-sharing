import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/Auth/authSlice";
import createUserSlice from "./slices/Auth/createUserSlice";
import loginUserSlice from "./slices/Auth/loginUserSlice";
import verifyUserSlice from "./slices/Auth/verifyUserSlice";
import addPostSlice from "./slices/Posts/addPostSlice";
import getAllPostSlice from "./slices/Posts/getAllPostSlice";

const authSlices = {
  auth: authSlice,
  createUser: createUserSlice,
  loginUser: loginUserSlice,
  verifyUser: verifyUserSlice,
};

const postSlices = {
  addPost: addPostSlice,
  getAllPost: getAllPostSlice,
};

const rootSlices = combineReducers({
  ...authSlices,
  ...postSlices,
});

export const store = configureStore({
  reducer: rootSlices,
});
