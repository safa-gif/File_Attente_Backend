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
    console.log("This is You're user", user);

    // userRepository.create({ Name, email, password });
    const token = encrypt.generateToken({ id: user.id });

    return res.status(200).json({ message: "User created successfully", user });
  }

  // Get All Users
  static async getUsers(req: Request, res: Response) {
    // const data = cache.get("data");
    // if (data) {
    //   console.log("serving from cache");
    //   return res.status(200).json({
    //     data,
    //   });
    // } else {
    //   console.log("serving from db");
    //   const userRepository = AppDataSource.getRepository(User);
    //   const users = await userRepository.find();

    //   cache.put("data", users, 6000);
    //   return res.status(200).json({
    //     data: users,
        
    //   });
    // }
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    console.log("Here result after find",users);
    
    return res.status(200).json({ users});
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
    console.log(JSON.stringify(user));
   if(user) {
    res.status(200).json({ message: "udpdate", user });
   }
   else {
    console.log("Error updating the user")
    res.status(500).json({ message: "The has been an error while udpdating this user"});

   }
  }

  // Delete User
  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    await userRepository.remove(user);
    if(user) {
      res.status(200).json({ message: "ok" });
      console.log( "User deleted successfully")
    }
    else{
        res.status(500).json({ message: "User couldn't be deleted"})
        console.log("Error while deleting this user");
    }
  }
  //Get User By Id
  static async getUserById(req:Request ,res :Response){
    const {id} = req.params ;
    const userRepository=AppDataSource.getRepository(User);
    const user = await userRepository.findOne({where:{id}})
    .then((user)=>{
      console.log("Hello "+user.fullName);
      res.status(201).json({ message: "User found by ID ", data: user});

    })
    
  }

  // Count Users 
  static async countUsers(req: Request, res: Response){
    const userRepository = AppDataSource.getRepository(User);
    const nbUsers = await userRepository.count();
    console.log("This is the number of user in our app "+nbUsers);
    if(nbUsers>0){
      res.status(200).json({ message: "Ok", data: nbUsers })
    }
    else {
      console.log('There are no  users in our app'+nbUsers);
      res.status(404).json({ message: "Empty", data: nbUsers})
    }
  }

  // Get All Operateurs
  static async getAllOperators (req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const op = await userRepository.findOne({ where : {role : "operateur"}})
    .then((op)=>{
      console.log("Hello "+op);
      res.status(201).json({ message: "User found by ID ", data: op});

    })
  }
}
