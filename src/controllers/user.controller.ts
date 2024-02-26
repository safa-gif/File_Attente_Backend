import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
import * as cache from "memory-cache";

export class UserController {

    //SignUp
  static async signup(req: Request, res: Response) {
    const { fullName, email, telephone, password, role } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User();
    user.fullName = fullName;
    user.email = email;
    user.telephone = telephone;
    user.password = encryptedPassword;
    user.role = role;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    // userRepository.create({ Name, email, password });
    const token = encrypt.generateToken({ id: user.id });

    return res.status(200).json({ message: "User created successfully", token, user });
  }

  // Get All Users
  static async getUsers(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();

      cache.put("data", users, 6000);
      return res.status(200).json({
        data: users,
      });
    }
  }

  //Update user
  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, telephone, password } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    user.fullName = name;
    user.email = email;
    user.telephone = telephone;
    user.password = encryptedPassword;
    await userRepository.save(user);
    res.status(200).json({ message: "udpdate", user });
  }

  // Delete User
  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    await userRepository.remove(user);
    res.status(200).json({ message: "ok" });
  }
}
