import React, { useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout.jsx";

import OtpInput from "../../components/Inputs/OtpInput.jsx";
import SignInForm from "./helpers/SignInForm.jsx";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  return (
    <AuthLayout>
      {isOtpVisible ? (
        <OtpInput email={email} />
      ) : (
        <SignInForm setEmail={setEmail} setIsOtpVisible={setIsOtpVisible} />
      )}
    </AuthLayout>
  );
};

export default SignIn;
