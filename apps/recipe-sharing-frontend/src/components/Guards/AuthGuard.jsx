import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

const AuthGuard = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);
  return <MainLayout>{children}</MainLayout>;
};

export default AuthGuard;
