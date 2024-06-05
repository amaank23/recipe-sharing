import express from "express";
import authController from "../controllers/AuthController";
import validations from "../validations";
import validationMiddleware from "../middlewares/validationMiddleware";
const router = express.Router();

/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Create a new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - phone
 *              - password
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      201:
 *        description: User Created Success
 *      400:
 *        description: Fields Empty
 *      409:
 *        description: User Already Exist
 *      500:
 *        description: Server Error
 */
router.post(
  "/register",
  validations.signupValidator,
  validationMiddleware,
  authController.signUp
);

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Sign in User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      200:
 *        description: Successfully Logged In
 *      400:
 *        description: Fields Empty
 *      401:
 *        description: Incorrect Credentials
 *      403:
 *        description: Account Verification Required
 *      404:
 *        description: User Not Found
 *      500:
 *        description: Server Error
 */
router.post(
  "/login",
  validations.signinValidator,
  validationMiddleware,
  authController.signIn
);

/**
 * @openapi
 * '/api/auth/verify-otp':
 *  patch:
 *     tags:
 *     - Auth
 *     summary: Verify Otp
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - otp
 *              - email
 *            properties:
 *              otp:
 *                type: number
 *              email:
 *                type: string
 *     responses:
 *      200:
 *        description: Successfully Verfied
 *      404:
 *        description: Fields should not be empty
 *      400:
 *        description: Invalid otp or email
 *      500:
 *        description: Server Error
 */
router.patch(
  "/verify-otp",
  validations.otpValidator,
  validationMiddleware,
  authController.verifyOtp
);

export default router;
