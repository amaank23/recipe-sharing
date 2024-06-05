import { Dropdown } from "antd";

import UserIcon from "./../../assets/user-1.png";
import React from "react";
import { useDispatch } from "react-redux";
import { authFailure } from "./../../redux/slices/Auth/authSlice";
import { Link } from "react-router-dom";
const UserIconAndDropdown = () => {
  const dispatch = useDispatch();
  const items = [
    {
      label: <Link to={"/profile"}>Profile</Link>,
      key: "0",
    },
    {
      label: <button onClick={() => dispatch(authFailure())}>Logout</button>,
      key: "1",
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div className="bg-[#F4F5F7] flex justify-center items-center w-10 h-10 rounded-full cursor-pointer">
        <img src={UserIcon} alt="" />
      </div>
    </Dropdown>
  );
};

export default UserIconAndDropdown;
