import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../utils/constants";

type ErrorType = { status: number; message: string };

export default async function errorMiddleware(
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || INTERNAL_SERVER_ERROR;
  //   if (error.hasOwnProperty("transaction")) {
  //     try {
  //       await error.transaction.rollback();
  //     } catch (err) {
  //       return res.status(500).json({ message: err.message });
  //     }
  //   }
  return res.status(status).json({ message: message });
}
