import { Dropdown } from "antd";

import UserIcon from "./../../assets/user-1.png";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authFailure } from "./../../redux/slices/Auth/authSlice";
import { Link } from "react-router-dom";
import { socket } from "../../utils/socket";
import { useChat } from "../../utils/context/chatContext";
const UserIconAndDropdown = () => {
  const auth = useSelector((state) => state.auth);
  const chatContext = useChat();
  const dispatch = useDispatch();
  const items = [
    {
      label: <Link to={"/profile"}>Profile</Link>,
      key: "0",
    },
    {
      label: (
        <button
          onClick={() => {
            chatContext.closeChat();
            socket.emit("leave");
            dispatch(authFailure());
          }}
        >
          Logout
        </button>
      ),
      key: "1",
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div className="bg-[#F4F5F7] flex justify-center items-center w-10 h-10 rounded-full overflow-hidden cursor-pointer">
        <img
          src={
            auth?.user?.profile?.profileImgUrl || "https://placehold.co/40x40"
          }
          alt=""
          className="w-full h-full"
        />
      </div>
    </Dropdown>
  );
};

export default UserIconAndDropdown;
