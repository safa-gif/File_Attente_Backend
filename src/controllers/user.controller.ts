import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
import * as cache from "memory-cache";
import { authorization } from "../middleware/authorization";
// import { authentification } from "../middleware/authentification";

export class UserController {

    //SignUp
  static async signup(req: Request, res: Response) {
    const { id, nom,prenom,email, telephone, password, role } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User();
    user.id = id;
    user.nom = nom;
    user.prenom= prenom;
    user.email = email;
    user.telephone = telephone;
    user.password = encryptedPassword;
    user.role = role;

    const userRepository = AppDataSource.getRepository(User);
    const userexit = await userRepository.findOne({where : {id: id} ||
      {nom : nom} || {email: email} || 
      {password: encryptedPassword} || {telephone : telephone}})
      if(userexit!= null) {
        return res.status(500).json({
          message : "User already exists" 
        })
      }
      else {
        await userRepository.save(user);
        const token = encrypt.generateToken({ id: user.id });

        return res.status(200).json({
          message:" Successfully Signed Up! ", token});
      }
    // await userRepository.save(user);

    // return res.status(200).json({ message: "User created successfully"});
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
    //     message : "this is all the users in the repository",
    //     data: users,
        
    //   });
    // }
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    
    return res.status(200).json({ 
      // message: "This are all the users", 
      data : users});
  }

  //Update user
  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { nom, prenom, email, telephone, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    user.nom= nom;
    user.prenom= prenom;
    user.email = email; 
    user.telephone = telephone;
    if(password) {
      user.password= await encrypt.encryptpass(password);
    }
    // user.password = await encrypt.encryptpass(password);
  
    await userRepository.save(user);
   if(user!== undefined || null) {
    res.status(200).json({ message: "udpdated seccessfuly", user });
    // console.log("THE USER THAT HAS BEEN UPDATED", user);
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
    res.status(200).json({ message : "User deleted successfully"})
  }
  //Get User By Id
  static async getUserById(req:Request ,res :Response){
    const {id} = req.params ;
    console.log("HELLO",id)
    const userRepository=AppDataSource.getRepository(User);
    const user = await userRepository.findOne({where:{id}})
    .then((user)=>{
      // console.log("Hello "+user.nom);
      res.status(201).json({ message: "User found by ID ", user});

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
    await userRepository.find({ where : {role : "operateur"}})
    .then((op)=>{
      // console.log("Hello "+op);
      res.status(201).json({ message: "These are all your operators", data: op });

    })
  }

  // Get All the Clients
  static async getAllClients (req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.find({ where : {role : "client"}})
    .then((cl)=>{
      // console.log("Hello "+cl);
      res.status(201).json({ message: "These are all your clients ", data: cl});

    })
  }
  // Get All Admins
  static async getAllAdmins (req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.find({ where : {role : "admin"}})
    .then((ad)=>{
      // console.log("Hello "+cl);
      res.status(201).json({ message: "These are all your clients ", data: ad});

    })
  }
   // Getting users' role 
   static async getUserRole (req: Request, res: Response) {
    const {id} = req.params ;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({where:{id}})
    
    // await userRepository.findOne({ where : {role : "client"}})
    // .then((cl)=>{
    //   console.log("Hello "+cl);
    //   res.status(201).json({ message: "These are all your clients ", data: cl});

    // })
  }
  //le client awel haja ya3malha register, we mba3id login, sinon ichouf les produits we réservi tickets
  
}
