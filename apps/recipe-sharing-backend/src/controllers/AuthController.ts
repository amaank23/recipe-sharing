import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/error";
import { UserRepository } from "../repository/user.repository";
import {
  EMAIL_ALREADY_EXIST,
  INCORRECT_PASSWORD,
  INVALID_OTP,
  INVALID_USER,
  NOT_FOUND_EMAIL,
  PHONE_ALREADY_EXIST,
  SUCCESS_LOGGED_IN,
  SUCCESSFULLY_VERFIED,
  USER_CREATED_SUCCESSFULLY,
} from "../utils/constants";
import { compareHashes, generateHashedPassword } from "../utils/hashing";
import User from "../entities/User";

async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const isUserEmailExist = await UserRepository.findByEmail(email);
    const isUserPhoneExist = await UserRepository.findByPhone(phone);
    if (isUserEmailExist) {
      throw new CustomError(EMAIL_ALREADY_EXIST, 409).errorInstance();
    }
    if (isUserPhoneExist) {
      throw new CustomError(PHONE_ALREADY_EXIST, 409).errorInstance();
    }
    const hashedPassword = await generateHashedPassword(password);
    const otp = +UserRepository.generateOtp();
    const user: User = UserRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isVerified: false,
      otp: otp,
      phone,
    });
    await UserRepository.save(user);
    UserRepository.sendOtp(email, `Otp is ${otp}`);
    res.status(201).json({
      message: USER_CREATED_SUCCESSFULLY,
      user: {
        email,
        firstName,
        lastName,
        isVerified: user.isVerified,
        phone,
      },
    });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user: User = await UserRepository.findByEmail(email);
    if (!user) {
      throw new CustomError(NOT_FOUND_EMAIL, 401).errorInstance();
    }
    const isMatch = await compareHashes(password, user.password);
    if (!isMatch) {
      throw new CustomError(INCORRECT_PASSWORD, 401).errorInstance();
    }
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isVerified: user.isVerified,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      id: user.id,
    };
    if (!body.isVerified) {
      const otp = +UserRepository.generateOtp();
      user.otp = otp;
      await UserRepository.save(user);
      UserRepository.sendOtp(email, `Otp is ${otp}`);
      throw new CustomError(
        "Account Verification Required, check your email for OTP",
        403
      ).errorInstance();
    }
    let token = UserRepository.generateToken(body);
    res.status(200).json({
      message: SUCCESS_LOGGED_IN,
      user: body,
      token,
    });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

async function verifyOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const { otp, email } = req.body;
    const user: User = await UserRepository.findByEmail(email);
    if (!user) {
      throw new CustomError(INVALID_USER, 400).errorInstance();
    }
    if (user.otp !== otp) {
      throw new CustomError(INVALID_OTP, 400).errorInstance();
    }
    user.isVerified = true;
    await UserRepository.save(user);
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isVerified: user.isVerified,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      id: user.id,
    };
    let token = UserRepository.generateToken(body);
    res.status(200).json({ message: SUCCESSFULLY_VERFIED, user: body, token });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

export default { signUp, verifyOtp, signIn };
