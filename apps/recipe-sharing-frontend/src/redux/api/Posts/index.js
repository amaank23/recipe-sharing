import { fileRequest, getRequest, postRequest } from "../../../utils/baseApi";
import { successMessage } from "../../../utils/message";
import { handleApiErrors } from "../../../utils/util";
import endpoints from "../../endpoints";
import {
  addPost,
  addPostFailure,
  addPostSuccess,
} from "../../slices/Posts/addPostSlice";
import {
  commentOnPost,
  commentOnPostFailure,
  commentOnPostSuccess,
} from "../../slices/Posts/commentOnPostSlice";
import {
  getAllPostsById,
  getAllPostsByIdFailure,
  getAllPostsByIdSuccess,
} from "../../slices/Posts/getAllPostsByIdSlice";
import {
  getAllPost,
  getAllPostFailure,
  getAllPostSuccess,
} from "../../slices/Posts/getAllPostSlice";
import {
  getCommentsByPostId,
  getCommentsByPostIdFailure,
  getCommentsByPostIdSuccess,
} from "../../slices/Posts/getCommentsByPostIdSlice";
import {
  likeUnlikePost,
  likeUnlikePostFailure,
  likeUnlikePostSuccess,
} from "../../slices/Posts/likeUnlikePostSlice";

export async function addPostApi(dispatch, body, onSuccess) {
  try {
    dispatch(addPost());
    const res = await fileRequest(endpoints.Posts.addPost, body);
    dispatch(addPostSuccess(res.data));
    successMessage(res?.data?.message);
    onSuccess();
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(addPostFailure(error?.response?.data));
  }
}

export async function getAllPostApi(dispatch, pageLimit) {
  try {
    dispatch(getAllPost());
    const res = await getRequest(
      `${endpoints.Posts.getAllPost}?page=${pageLimit.page}&limit=${pageLimit.limit}`
    );
    dispatch(getAllPostSuccess(res.data));
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(getAllPostFailure(error?.response?.data));
  }
}
export async function likeUnlikePostApi(
  dispatch,
  postId,
  onSuccess = () => {}
) {
  try {
    dispatch(likeUnlikePost());
    const res = await postRequest(`${endpoints.Posts.likeUnlikePost(postId)}`);
    dispatch(likeUnlikePostSuccess(res.data));
    onSuccess(res?.data?.data);
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(likeUnlikePostFailure(error?.response?.data));
  }
}
export async function commentOnPostApi(
  dispatch,
  postId,
  body,
  onSuccess = () => {}
) {
  try {
    dispatch(commentOnPost());
    const res = await postRequest(
      `${endpoints.Posts.commentOnPost(postId)}`,
      body
    );
    dispatch(commentOnPostSuccess(res.data));
    successMessage(res?.data?.message);
    onSuccess();
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(commentOnPostFailure(error?.response?.data));
  }
}
export async function getCommentsByPostIdApi(dispatch, postId, onSuccess) {
  try {
    dispatch(getCommentsByPostId());
    const res = await getRequest(`${endpoints.Posts.commentOnPost(postId)}`);
    dispatch(getCommentsByPostIdSuccess(res.data));
    onSuccess(res.data);
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(getCommentsByPostIdFailure(error?.response?.data));
  }
}
export async function getAllPostsByIdApi(dispatch, pageLimit, userId) {
  try {
    dispatch(getAllPostsById());
    const res = await getRequest(
      `${endpoints.Posts.getAllPostsById(userId)}?page=${
        pageLimit.page
      }&limit=${pageLimit.limit}`
    );
    dispatch(getAllPostsByIdSuccess(res.data));
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(getAllPostsByIdFailure(error?.response?.data));
  }
}
