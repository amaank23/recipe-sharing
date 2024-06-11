import { patchRequest, postRequest } from "../../../utils/baseApi";
import { successMessage } from "../../../utils/message";
import endpoints from "../../endpoints";
import {
  acceptFriendRequest,
  acceptFriendRequestFailure,
  acceptFriendRequestSuccess,
} from "../../slices/Friends/acceptFriendRequestSlice";
import {
  sendFriendRequest,
  sendFriendRequestFailure,
  sendFriendRequestSuccess,
} from "../../slices/Friends/sendFriendRequestSlice";
import {
  rejectFriendRequest,
  rejectFriendRequestFailure,
  rejectFriendRequestSuccess,
} from "../../slices/Friends/rejectFriendRequestSlice";

export async function sendFriendRequestApi(
  dispatch,
  body,
  onSuccess = () => {}
) {
  try {
    dispatch(sendFriendRequest());
    const res = await postRequest(endpoints.Friends.sendFriendRequest, body);
    dispatch(sendFriendRequestSuccess(res.data));
    successMessage(res?.data?.message);
    onSuccess();
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(sendFriendRequestFailure(error?.response?.data));
  }
}

export async function acceptFriendRequestApi(
  dispatch,
  body,
  onSuccess = () => {}
) {
  try {
    dispatch(acceptFriendRequest());
    const res = await patchRequest(endpoints.Friends.acceptFriendRequest, body);
    dispatch(acceptFriendRequestSuccess(res.data));
    successMessage(res?.data?.message);
    onSuccess();
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(acceptFriendRequestFailure(error?.response?.data));
  }
}

export async function rejectFriendRequestApi(
  dispatch,
  body,
  onSuccess = () => {}
) {
  try {
    dispatch(rejectFriendRequest());
    const res = await patchRequest(endpoints.Friends.rejectFriendRequest, body);
    dispatch(rejectFriendRequestSuccess(res.data));
    successMessage(res?.data?.message);
    onSuccess();
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(rejectFriendRequestFailure(error?.response?.data));
  }
}
