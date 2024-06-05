import { authFailure } from "../redux/slices/Auth/authSlice";
import { errorMessage } from "./message";

export function handleApiErrors(error, dispatch) {
  if (error?.response?.status === 401 && dispatch) {
    dispatch(authFailure());
  }
  if (error?.response?.data?.type === "validation-error") {
    error?.response?.data.errors.forEach((item) => {
      errorMessage(item.msg);
    });
    return;
  }
  errorMessage(error?.response?.data?.message || error?.message);
}
