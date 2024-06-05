import { body } from "express-validator";

export default [
  body("email").isEmail().withMessage("Please enter correct email"),
  body("password").notEmpty().withMessage("Password is required"),
];
