import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/Auth/authSlice";
import createUserSlice from "./slices/Auth/createUserSlice";
import loginUserSlice from "./slices/Auth/loginUserSlice";
import verifyUserSlice from "./slices/Auth/verifyUserSlice";
import addPostSlice from "./slices/Posts/addPostSlice";
import getAllPostSlice from "./slices/Posts/getAllPostSlice";
import likeUnlikePostSlice from "./slices/Posts/likeUnlikePostSlice";
import commentOnPostSlice from "./slices/Posts/commentOnPostSlice";
import getCommentsByPostIdSlice from "./slices/Posts/getCommentsByPostIdSlice";
import EditProfileSlice from "./slices/Profile/EditProfileSlice";
import getAllUsersSlice from "./slices/Users/getAllUsersSlice";
import getUserByIdSlice from "./slices/Users/getUserByIdSlice";
import getAllPostsByIdSlice from "./slices/Posts/getAllPostsByIdSlice";

const authSlices = {
  auth: authSlice,
  createUser: createUserSlice,
  loginUser: loginUserSlice,
  verifyUser: verifyUserSlice,
};
const profileSlices = {
  EditProfile: EditProfileSlice,
};

const usersSlices = {
  getAllUsers: getAllUsersSlice,
  getUserById: getUserByIdSlice,
};

const postSlices = {
  addPost: addPostSlice,
  getAllPost: getAllPostSlice,
  likeUnlikePost: likeUnlikePostSlice,
  commentOnPost: commentOnPostSlice,
  getCommentsByPostId: getCommentsByPostIdSlice,
  getAllPostsById: getAllPostsByIdSlice,
};

const rootSlices = combineReducers({
  ...authSlices,
  ...postSlices,
  ...profileSlices,
  ...usersSlices,
});

export const store = configureStore({
  reducer: rootSlices,
});
