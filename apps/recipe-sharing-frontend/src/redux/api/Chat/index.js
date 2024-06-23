import { getRequest, postRequest } from "../../../utils/baseApi";
import { handleApiErrors } from "../../../utils/util";
import endpoints from "../../endpoints";
import {
  createChat,
  createChatFailure,
  createChatSuccess,
} from "../../slices/Chat/createChatSlice";
import {
  getAllChatMessages,
  getAllChatMessagesFailure,
  getAllChatMessagesSuccess,
} from "../../slices/Chat/getAllChatMessagesSlice";
import {
  sendMessage,
  sendMessageFailure,
  sendMessageSuccess,
} from "../../slices/Chat/sendMessageSlice";

export async function createChatApi(dispatch, body, onSuccess) {
  try {
    dispatch(createChat());
    const res = await postRequest(`${endpoints.Chat.createChat}`, body);
    dispatch(createChatSuccess(res.data));
    onSuccess(res.data);
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(createChatFailure(error?.response?.data));
  }
}

export async function sendMessageApi(dispatch, body, chatId, onSuccess) {
  try {
    dispatch(sendMessage());
    const res = await postRequest(
      `${endpoints.Chat.sendMessage(chatId)}`,
      body
    );
    dispatch(sendMessageSuccess(res.data));
    onSuccess(res.data);
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(sendMessageFailure(error?.response?.data));
  }
}

export async function getAllChatMessagesApi(
  dispatch,
  pageLimit,
  chatId,
  onSuccess
) {
  try {
    dispatch(getAllChatMessages());
    const res = await getRequest(
      `${endpoints.Chat.getAllChatMessages(chatId)}?page=${
        pageLimit.page
      }&limit=${pageLimit.limit}`
    );
    dispatch(getAllChatMessagesSuccess(res.data));
    onSuccess(res.data);
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(getAllChatMessagesFailure(error?.response?.data));
  }
}
