import { Button } from "antd";
import React from "react";

const CustomButton = ({ children, className = "", ...rest }) => {
  return (
    <Button
      className={`bg-primary text-white w-full text-[1.1875rem] h-[50px] ${className}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
