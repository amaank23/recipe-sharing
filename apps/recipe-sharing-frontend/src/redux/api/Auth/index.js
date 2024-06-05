import { patchRequest, postRequest } from "../../../utils/baseApi";
import { successMessage } from "../../../utils/message";
import endpoints from "../../endpoints";
import {
  createUserFailure,
  createUserSuccess,
  createUser,
} from "../../slices/Auth/createUserSlice";
import {
  verifyUser,
  verifyUserSuccess,
  verifyUserFailure,
} from "../../slices/Auth/verifyUserSlice";
import { authSuccess } from "../../slices/Auth/authSlice";
import { handleApiErrors } from "./../../../utils/util";
import {
  loginUser,
  loginUserFailure,
  loginUserSuccess,
} from "../../slices/Auth/loginUserSlice";
export async function createUserApi(dispatch, body, onSuccess) {
  try {
    dispatch(createUser());
    const res = await postRequest(endpoints.Auth.register, body);
    dispatch(createUserSuccess(res.data));
    onSuccess();
  } catch (error) {
    dispatch(createUserFailure(error?.response?.data));
    handleApiErrors(error);
  }
}

export async function loginUserApi(dispatch, body, onSuccess) {
  try {
    dispatch(loginUser());
    const res = await postRequest(endpoints.Auth.login, body);
    dispatch(loginUserSuccess(res.data));
    successMessage(res?.data?.message);
    dispatch(authSuccess(res.data));
  } catch (error) {
    if (error?.response?.status === 403) {
      onSuccess();
    }
    dispatch(loginUserFailure(error?.response?.data));
    handleApiErrors(error);
  }
}

export async function verifyUserApi(dispatch, body) {
  try {
    dispatch(verifyUser());
    const res = await patchRequest(endpoints.Auth.otpVerification, body);
    dispatch(verifyUserSuccess(res.data));
    successMessage(res?.data?.message);
    dispatch(authSuccess(res.data));
  } catch (error) {
    dispatch(verifyUserFailure(error?.response?.data));
    handleApiErrors(error);
  }
}
