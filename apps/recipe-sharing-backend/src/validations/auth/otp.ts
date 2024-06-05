import { body } from "express-validator";

export default [
  body("otp")
    .notEmpty()
    .withMessage("otp should not be empty")
    .isNumeric()
    .withMessage("OTP should be number")
    .isLength({ max: 4, min: 4 })
    .withMessage("OTP length should be 4"),
];
