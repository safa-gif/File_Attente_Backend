import { Request, Response } from "express";
// import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Bureau } from './../entity/Bureau.entity';

// Get All Bureaux
export class BureauController {
  static async getAllBureaux(req: Request, res: Response) {
    // const data = cache.get("data");
    // if (data) {
    //   console.log("serving from cache");
    //   return res.status(200).json({
    //     data,
    //   });
    // } else {
    //   console.log("serving from db");
    //   const bureauRepository = AppDataSource.getRepository(Bureau);
    //   const bureaux = await bureauRepository.find();
    //   cache.put("data", bureaux, 10000);
    //   return res.status(200).json({
    //     data: bureaux,
    //   });
    // }
    const bureauRepository = AppDataSource.getRepository(Bureau);
    const bureaux = await bureauRepository.find();
    // console.log("Here result after find",users);
    
    return res.status(200).json({ message: "This are all the users", bureaux});
  }

  // Create A New Bureau
  static async createBureau(req: Request, res: Response) {
    const {localisation } = req.body  ;
   const bureau = new Bureau();
   bureau.localisation = localisation;
    const bureauRepository = AppDataSource.getRepository(Bureau);
    await bureauRepository.save(bureau);
    return res.status(200).json({ message: "Bureau has been created successfully", bureau});
  }

  // Update A Bureau
    static async updateBureau(req: Request, res: Response) {
    const { id } = req.params;
    const {localisation} = req.body;
    const bureauRepository = AppDataSource.getRepository(Bureau);
    const bureau = await bureauRepository.findOne({where: { id },
    });
    bureau.localisation = localisation;
    await bureauRepository.save(bureau);
    return res.status(200).json({ message: "Bureau has been  updated successfully", bureau });
  }


  // Delete A Bureau
  static async deleteBureau(req: Request, res: Response) {
    const { id } = req.params;
    const bureauRepository = AppDataSource.getRepository(Bureau);
    const bureau = await bureauRepository.findOne({
      where: { id },
    });
    await bureauRepository.remove(bureau);
    return res.status(200).json({ message: "Bureau deleted successfully", bureau});
  }

  // Statistics
  static async totalBureau(req: Request, res: Response) {
    const bureauRepository = AppDataSource.getRepository(Bureau);
    const nbr = await bureauRepository.count();
    if( nbr > 0 ) {
        return res.status(200).json({message : "Nombre des bureaux  dans la base de données " , nbr})
    }
    else {
        return res.json({message : "Table est vide"})
    }
  }
   //Get Bureau By Id
   static async getBureauById(req:Request ,res :Response){
    const {id} = req.params ;
    const bureauRepository=AppDataSource.getRepository(Bureau);
    const bureau = await bureauRepository.findOne(
      {where : {id}}
    )
    .then((bureau)=>{
      // console.log("Hello ",bureau)
      res.status(201).json({ message: "Bureau has been found by ID ", data: bureau});

    })
    
  }
}
