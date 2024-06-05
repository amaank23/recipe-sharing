import React from "react";
import ContainerBody from "./../Containers/ContainerBody";
import Header from "./Header";
const MainLayout = ({ children }) => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Header />
      <ContainerBody>{children}</ContainerBody>
    </div>
  );
};

export default MainLayout;
