import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import { socket } from "../../utils/socket";

const AuthGuard = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } else {
      socket.emit("join", user.id);
      return () => {
        socket.emit("leave", user.id);
      };
    }
  }, [isAuth]);

  return <MainLayout>{children}</MainLayout>;
};

export default AuthGuard;
