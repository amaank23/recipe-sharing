import { myDataSource } from "../app-data-source";
import User from "../entities/User";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const UserRepository = myDataSource.getRepository(User).extend({
  findByEmail(email: string) {
    return this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
  },
  findByPhone(phone: string) {
    return this.createQueryBuilder("user")
      .where("user.phone = :phone", { phone })
      .getOne();
  },
  generateOtp() {
    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    return otp;
  },
  sendOtp(email: string, content: string) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verification Email",
      text: content,
    };
    transporter.sendMail(mailOptions);
  },
  generateToken(data: any) {
    const expirationTime = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
    const token = jwt.sign(
      {
        exp: expirationTime,
        data: data,
      },
      process.env.secretKey
    );
    return token;
  },
  verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, process.env.secretKey);
      return decoded;
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return { error: "Invalid token" };
      } else {
        return { error: "Internal server error" };
      }
    }
  },
});
