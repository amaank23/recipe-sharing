import React, { useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout.jsx";

import OtpInput from "../../components/Inputs/OtpInput.jsx";
import SignUpForm from "./helpers/SignUpForm.jsx";
const SignUp = () => {
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <AuthLayout>
      {isOtpVisible ? (
        <OtpInput email={email} />
      ) : (
        <SignUpForm setIsOtpVisible={setIsOtpVisible} setEmail={setEmail} />
      )}
    </AuthLayout>
  );
};

export default SignUp;
