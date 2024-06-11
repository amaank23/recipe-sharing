import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFriendRequestApi,
  rejectFriendRequestApi,
  sendFriendRequestApi,
} from "../../../redux/api/Friends";
import { getFromStorage } from "../../../utils/storage";
const ProfileTop = () => {
  const getUserById = useSelector((state) => state.getUserById);
  const dispatch = useDispatch();
  const authUser = getFromStorage("user");
  const data = getUserById.data?.data;
  const [friendShipStatus, setFriendShipStatus] = useState(null);
  function sendFriendRequest() {
    const body = {
      sender_id: authUser?.id,
      receiver_id: data?.user?.id,
    };
    sendFriendRequestApi(dispatch, body, () =>
      setFriendShipStatus("requested-authUser-to-Id")
    );
  }
  function acceptFriendRequest() {
    const body = {
      sender_id: data?.user?.id,
      receiver_id: authUser?.id,
    };
    acceptFriendRequestApi(dispatch, body, () => {
      setFriendShipStatus("friends");
    });
  }
  function rejectFriendRequest() {
    const body = {
      sender_id: data?.user?.id,
      receiver_id: authUser?.id,
    };
    rejectFriendRequestApi(dispatch, body, () => {
      setFriendShipStatus("not-friends");
    });
  }
  const buttons = {
    "not-friends": (
      <button
        onClick={sendFriendRequest}
        className="text-white bg-[#F85F35] border border-[#F85F35] hover:bg-[#f85f35c8] transition-all rounded-lg flex gap-1 py-[10px] px-4 items-center"
      >
        Add To Friend
      </button>
    ),
    "requested-Id-to-authUser": (
      <>
        <button
          onClick={acceptFriendRequest}
          className="text-white bg-[#F85F35] border border-[#F85F35] hover:bg-[#f85f35c8] transition-all rounded-lg flex gap-1 py-[10px] px-4 items-center"
        >
          Accept Request
        </button>
        <button
          onClick={rejectFriendRequest}
          className="text-primary bg-white border border-[#F85F35] hover:bg-[#f85f35c8] hover:text-white transition-all rounded-lg flex gap-1 py-[10px] px-4 items-center"
        >
          Reject Request
        </button>
      </>
    ),
    "requested-authUser-to-Id": (
      <button
        disabled
        className="text-white bg-[#F85F35] border border-[#F85F35] hover:bg-[#f85f35c8] transition-all rounded-lg flex gap-1 py-[10px] px-4 items-center"
      >
        Requested
      </button>
    ),
    friends: (
      <button
        disabled
        className="text-white bg-[#F85F35] border border-[#F85F35] hover:bg-[#f85f35c8] transition-all rounded-lg flex gap-1 py-[10px] px-4 items-center"
      >
        Friends
      </button>
    ),
  };
  useEffect(() => {
    if (getUserById?.data) {
      setFriendShipStatus(getUserById?.data?.data?.friendShipStatus);
    }
  }, [getUserById?.data]);
  return (
    <div className="mt-3 mb-6 relative bg-white rounded-xl">
      <div className="h-[206px] 2xl:h-[306px] rounded-t-xl overflow-hidden bg-slate-500">
        <img
          src={
            data?.user?.profile?.coverImgUrl || "https://placehold.co/800x306"
          }
          alt=""
          className="w-full h-[206px] 2xl:h-[306px] object-cover"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-end -translate-y-16 w-full">
        <div className="flex gap-3 items-end ml-4">
          <div className="rounded-full overflow-hidden w-[156px] h-[156px] border-[10px] border-white">
            <img
              src={
                data?.user?.profile?.profileImgUrl ||
                "https://placehold.co/156x156"
              }
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl text-[#2D3139 font-semibold">
              {`${data?.user?.firstName || ""} ${data?.user?.lastName || ""}`}
            </h2>
          </div>
        </div>
        <div className=" mr-4 flex items-center gap-2">
          {friendShipStatus && buttons[friendShipStatus]}
        </div>
      </div>
    </div>
  );
};

export default ProfileTop;
