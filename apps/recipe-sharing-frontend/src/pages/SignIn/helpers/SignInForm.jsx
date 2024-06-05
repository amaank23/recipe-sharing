import React from "react";
import { Col, Form, Row } from "antd";
import TextInput from "./../../../components/Inputs/TextInput.jsx";
import CustomButton from "./../../../components/Button/CustomButton.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserApi } from "../../../redux/api/Auth/index.js";
const SignInForm = ({ setEmail, setIsOtpVisible }) => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  function onFinish(values) {
    setEmail(values.email);
    loginUserApi(dispatch, values, () => {
      setIsOtpVisible(true);
    });
  }
  return (
    <div>
      <h3 className="text-black text-[2.25rem] pb-[2.3125rem] font-semibold">
        Sign In to your account
      </h3>
      <Form onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} md={24} className="mb-3">
            <TextInput name={"email"} placeholder={"Enter Email"} />
          </Col>
          <Col xs={24} md={24} className="mb-3">
            <TextInput
              name={"password"}
              placeholder={"Enter Password"}
              password
            />
          </Col>
          <Col xs={24} md={24}>
            <CustomButton htmlType="submit" loading={loginUser.loading}>
              Submit
            </CustomButton>
            <p className="pt-6 text-[1.125rem] text-textColor">
              Do not have an account?{" "}
              <Link to={"/register"} className="text-primary">
                Create now
              </Link>
            </p>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SignInForm;
