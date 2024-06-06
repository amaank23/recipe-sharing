import { getFromStorage } from "./storage";
import axios from "axios";
import { errorMessage } from "./message";

// Refresh token request

export const refreshRequest = (api, body) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.post(api, body, headers);
};

//Post Request
export const postRequest = (api, body = {}) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getFromStorage("token")}`,
    },
  };

  return axios.post(api, body, headers);
};
//Patch Request for
export const patchRequest = (api, body) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getFromStorage("token")}`,
    },
  };

  return axios.patch(api, body, headers);
};
//Post multipart Request
export const fileRequest = (api, body) => {
  const headers = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getFromStorage("token")}`,
    },
  };

  return axios.post(api, body, headers);
};
//Patch multipart Request
export const patchFileRequest = (api, body) => {
  const headers = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getFromStorage("token")}`,
    },
  };

  return axios.patch(api, body, headers);
};

//Get Request
export const getRequest = (api) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getFromStorage("token")}`,
    },
  };

  return axios.get(api, headers);
};

//delete Request
export const deleteRequest = (api) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getFromStorage("token")}`,
    },
  };

  return axios.delete(api, headers);
};
//delete request with body
export const deleteReqWithBody = (api, body) => {
  return axios.delete(api, {
    headers: {
      Authorization: "Bearer " + getFromStorage("token"),
    },
    data: {
      ...body,
    },
  });
};

export const getError = (err) => {
  if (err.response) {
    errorMessage(err.response?.data?.message);
  } else {
    errorMessage(err.toString());
  }
};
