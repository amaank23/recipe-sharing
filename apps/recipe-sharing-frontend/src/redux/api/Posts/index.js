import { fileRequest, getRequest } from "../../../utils/baseApi";
import { successMessage } from "../../../utils/message";
import { handleApiErrors } from "../../../utils/util";
import endpoints from "../../endpoints";
import {
  addPost,
  addPostFailure,
  addPostSuccess,
} from "../../slices/Posts/addPostSlice";
import {
  getAllPost,
  getAllPostFailure,
  getAllPostSuccess,
} from "../../slices/Posts/getAllPostSlice";

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
