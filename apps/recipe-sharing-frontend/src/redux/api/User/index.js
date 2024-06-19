import { getRequest } from "../../../utils/baseApi";
import { handleApiErrors } from "../../../utils/util";
import endpoints from "../../endpoints";
import {
  getAllUsers,
  getAllUsersFailure,
  getAllUsersSuccess,
} from "../../slices/Users/getAllUsersSlice";
import {
  getSearchResults,
  getSearchResultsFailure,
  getSearchResultsSuccess,
} from "../../slices/Users/getSearchResultsSlice";
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
export async function getSearchResultsApi(dispatch, query) {
  try {
    dispatch(getSearchResults());
    const res = await getRequest(
      `${endpoints.Users.getSearchResults}?query=${query}`
    );
    dispatch(getSearchResultsSuccess(res.data));
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(getSearchResultsFailure(error?.response?.data));
  }
}
