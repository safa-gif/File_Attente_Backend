import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const authentification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header : string = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized, missing header" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(402).json({ message: "Unauthorized, invalide token" });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) {
    return res.status(403).json({ message: "Unauthorized, not able to decode the token" });
  }
  req[" currentUser"] = decode;
  next();
};
