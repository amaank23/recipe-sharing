import React, { useState } from "react";
import { Col, Form, Row } from "antd";
import TextInput from "./../../../components/Inputs/TextInput.jsx";
import CustomButton from "./../../../components/Button/CustomButton.jsx";
import { Link } from "react-router-dom";
import { createUserApi } from "../../../redux/api/Auth/index.js";
import { useDispatch, useSelector } from "react-redux";
const SignUpForm = ({ setIsOtpVisible, setEmail }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [confirmPasswordValidation, setConfirmPasswordValidation] =
    useState(null);
  const createUserState = useSelector((state) => state.createUser);
  function onFinish(values) {
    setEmail(values.email);
    const body = {
      ...values,
      phone: values.phone.startsWith("0")
        ? "+92" + values.phone.substring(1)
        : values.phone,
    };
    createUserApi(dispatch, body, () => {
      setIsOtpVisible(true);
    });
  }
  return (
    <div>
      <h3 className="text-black text-[2.25rem] pb-[2.3125rem] font-semibold">
        Create Account
      </h3>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} md={12} className="mb-3">
            <TextInput name={"firstName"} placeholder={"Enter First Name"} />
          </Col>
          <Col xs={24} md={12} className="mb-3">
            <TextInput name={"lastName"} placeholder={"Enter Last Name"} />
          </Col>
          <Col xs={24} md={12} className="mb-3">
            <TextInput name={"email"} placeholder={"Enter Email"} />
          </Col>
          <Col xs={24} md={12} className="mb-3">
            <TextInput name={"phone"} placeholder={"Enter Phone"} />
          </Col>
          <Col xs={24} md={12} className="mb-3">
            <TextInput
              name={"password"}
              placeholder={"Enter Password"}
              password
            />
          </Col>
          <Col xs={24} md={12}>
            <TextInput
              formItemProps={
                confirmPasswordValidation
                  ? {
                      validateStatus: confirmPasswordValidation.validateStatus,
                      help: confirmPasswordValidation.error || "",
                    }
                  : {}
              }
              name={"confirmPassword"}
              placeholder={"Enter Confirm Password"}
              password
              onChange={(e) => {
                if (e.target.value !== form.getFieldValue("password")) {
                  setConfirmPasswordValidation({
                    validateStatus: "error",
                    error: "Password and Confirm Password does not Match",
                  });
                } else {
                  setConfirmPasswordValidation({
                    validateStatus: "success",
                    error: null,
                  });
                }
              }}
            />
          </Col>
          <Col xs={24} md={24}>
            <CustomButton loading={createUserState.loading} htmlType="submit">
              Submit
            </CustomButton>
            <p className="pt-6 text-[1.125rem] text-textColor">
              Already have an account?{" "}
              <Link to={"/login"} className="text-primary">
                Log in
              </Link>
            </p>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SignUpForm;
