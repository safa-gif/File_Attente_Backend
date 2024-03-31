import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { id, password } = req.body;

      if (!id || !password) {
        return res
          .status(501)
          .json({ message: " email and password required" });
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id } });
      
      const isPasswordValid = encrypt.comparepassword(user.password, password);
      if (!user || !isPasswordValid) {
        return res.status(404).json({ message: "User not found" });
      }
      const token = encrypt.generateToken({ id: user.id });
      // console.log("Usertosebd", user.role);
      return res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
      console.error("This is an auth.contoller error",error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req: Request, res: Response) {
    if (!req[" currentUser"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req[" currentUser"].id },
    });
    return res.status(200).json({ ...user, password: undefined });
  }
}
