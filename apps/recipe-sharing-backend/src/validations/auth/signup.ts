import { body } from "express-validator";

export default [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("email").isEmail().withMessage("Please enter correct email"),
  body("password").notEmpty().withMessage("Password is required"),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isLength({ min: 13, max: 13 })
    .withMessage("Invalid Phone No"),
];
