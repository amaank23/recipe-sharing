import { NextFunction, Request, Response } from "express";
import User from "../entities/User";
import { UserRepository } from "../repository/user.repository";
import { INVALID_USER } from "../utils/constants";
import CustomError from "../utils/error";
import { CustomRequest } from "../middlewares/authMiddleware";
import { Not } from "typeorm";

async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const user: User = await UserRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
    if (!user) {
      throw new CustomError(INVALID_USER, 400).errorInstance();
    }
    res.status(200).json({ message: "Successfully Get", data: { user } });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

async function getAllUsers(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.data.id;
    const users: User[] = await UserRepository.find({
      where: { id: Not(userId) },
      relations: { profile: true },
    });
    res.status(200).json({ message: "Successfully Get", data: users });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

export default { getAllUsers, getUserById };
