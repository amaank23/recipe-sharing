import { fileRequest, patchFileRequest } from "../../../utils/baseApi";
import { successMessage } from "../../../utils/message";
import { handleApiErrors } from "../../../utils/util";
import endpoints from "../../endpoints";
import {
  EditProfile,
  EditProfileFailure,
  EditProfileSuccess,
} from "../../slices/Profile/EditProfileSlice";

export async function EditProfileApi(
  dispatch,
  body,
  profileId,
  onSuccess = () => {}
) {
  try {
    dispatch(EditProfile());
    const res = await patchFileRequest(
      endpoints.Profile.EditProfile(profileId),
      body
    );
    dispatch(EditProfileSuccess(res.data));
    successMessage(res?.data?.message);
    onSuccess(res?.data);
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(EditProfileFailure(error?.response?.data));
  }
}
