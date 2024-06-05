import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/user.repository";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: JwtPayload;
}

export default function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const { authorization: authHeader } = req.headers;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const tokenDecoded = UserRepository.verifyToken(token);
    if (tokenDecoded.error) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      req.user = tokenDecoded;
      next();
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
