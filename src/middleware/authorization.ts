import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.find({
      where: { id: req[" currentUser"].id},
      // where : {id: req.params.id}
    });
    console.log("This is our current loggedIn user",user);
    // if (!roles.includes(user['role'])) {
    //   return res.status(403).json({ message: "Forbidden role" });
    // }
    next();
  };
};
