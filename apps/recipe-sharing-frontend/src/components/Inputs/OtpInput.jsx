// OtpInput.jsx
import { useEffect, useRef, useState } from "react";
import CustomButton from "../Button/CustomButton";
import { errorMessage } from "../../utils/message";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserApi } from "../../redux/api/Auth";

const OtpInput = ({ length = 4, email }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const verifyUser = useSelector((state) => state.verifyUser);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  function onOtpSubmit() {
    const combinedOtp = otp.join("");
    if (combinedOtp.length !== length) {
      errorMessage("Please Enter 4 digit OTP.");
    }
    verifyUserApi(dispatch, { email, otp: +combinedOtp });
  }

  return (
    <div>
      <h3 className="text-black text-[2.25rem] pb-[2.3125rem] font-semibold">
        Verify Account
      </h3>
      <div className="flex gap-3 justify-center mb-5">
        {otp.map((value, index) => {
          return (
            <input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-[60px] h-[60px] border border-borderColor text-center text-[1.125rem]"
            />
          );
        })}
      </div>

      <CustomButton
        htmlType="submit"
        onClick={onOtpSubmit}
        loading={verifyUser.loading}
      >
        Submit
      </CustomButton>
      <p className="pt-6 text-[1.125rem] text-textColor">
        Check your email for otp.
      </p>
    </div>
  );
};
export default OtpInput;
