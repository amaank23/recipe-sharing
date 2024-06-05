import { Form, Input } from "antd";
import React from "react";

const TextInput = ({
  placeholder,
  name,
  required = true,
  password,
  formItemProps,
  ...rest
}) => {
  return (
    <Form.Item name={name} rules={[{ required }]} {...formItemProps}>
      {password ? (
        <Input.Password
          {...rest}
          placeholder={placeholder}
          className="border-t-0 border-l-0 border-r-0 rounded-none border-b-2 border-borderColor focus:border-primary focus-within:shadow-none pb-3 pl-0 focus:shadow-none text-textColor text-[1rem]"
        />
      ) : (
        <Input
          {...rest}
          placeholder={placeholder}
          className="border-t-0 border-l-0 border-r-0 rounded-none border-b-2 border-borderColor focus:border-primary focus-within:shadow-none pb-3 pl-0 text-textColor text-[1rem]"
        />
      )}
    </Form.Item>
  );
};

export default TextInput;
