import { getRequest } from "../../../utils/baseApi";
import { handleApiErrors } from "../../../utils/util";
import endpoints from "../../endpoints";
import {
  getAllUsers,
  getAllUsersFailure,
  getAllUsersSuccess,
} from "../../slices/Users/getAllUsersSlice";
import {
  getUserById,
  getUserByIdFailure,
  getUserByIdSuccess,
} from "../../slices/Users/getUserByIdSlice";

export async function getAllUsersApi(dispatch) {
  try {
    dispatch(getAllUsers());
    const res = await getRequest(`${endpoints.Users.getAllUsers}`);
    dispatch(getAllUsersSuccess(res.data));
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(getAllUsersFailure(error?.response?.data));
  }
}

export async function getUserByIdApi(dispatch, userId) {
  try {
    dispatch(getUserById());
    const res = await getRequest(`${endpoints.Users.getUserById(userId)}`);
    dispatch(getUserByIdSuccess(res.data));
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(getUserByIdFailure(error?.response?.data));
  }
}
