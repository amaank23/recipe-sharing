import React, { useEffect } from "react";
import Logo from "./../../assets/logo.svg";
import BgImg from "./../../assets/auth-bg.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);
  return (
    <div className="flex w-full h-screen bg-primary ">
      <div className="w-[40%] relative flex items-center">
        <img src={Logo} alt="" className="absolute left-0 top-0" />
        <h2 className="text-[2rem] font-bold text-white px-[3.3125rem] pt-[3.0625rem] -tracking-tighter">
          Unleash Flavorful Discoveries: Share, Savor, and Create!
        </h2>
      </div>
      <div className="w-[60%] rounded-tl-[3.875rem] rounded-bl-[3.875rem] bg-white py-[7.75rem] px-[12.6875rem]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
