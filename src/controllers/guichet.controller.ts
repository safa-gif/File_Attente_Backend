import { Request, Response } from "express";
// import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Guichet } from "../entity/Guichet.entity";

// Get All Guichetx
export class GuichetController {
  static async getAllGuichets(req: Request, res: Response) {
    // const data = cache.get("data");
    // if (data) {
    //   console.log("serving from cache");
    //   return res.status(200).json({
    //     data,
    //   });
    // } else {
    //   console.log("serving from db");
    //   const GuichetRepository = AppDataSource.getRepository(Guichet);
    //   const Guichetx = await GuichetRepository.find();
    //   cache.put("data", Guichetx, 10000);
    //   return res.status(200).json({
    //     data: Guichetx,
    //   });
    // }
    const guichetRepository = AppDataSource.getRepository(Guichet);
    const Guichetx = await guichetRepository.find();
    // console.log("Here result after find",users);
    
    return res.status(200).json({ message: "This are all the guichets", Guichetx});
  }

  // Create A New Guichet
  static async createGuichet(req: Request, res: Response) {
    const {localisation } = req.body  ;
   const guichet = new Guichet();
//    guichet.localisation = localisation;
    const guichetRepository = AppDataSource.getRepository(Guichet);
    await guichetRepository.save(guichet);
    return res.status(200).json({ message: "Guichet has been created successfully", guichet});
  }

  // Update A Guichet
    static async updateGuichet(req: Request, res: Response) {
    const { id } = req.params;
    const {localisation} = req.body;
    const guichetRepository = AppDataSource.getRepository(Guichet);
    const guichet = await guichetRepository.findOne({where: { id },
    });
    // guichet.localisation = localisation;
    await guichetRepository.save(guichet);
    return res.status(200).json({ message: "Guichet has been  updated successfully", guichet });
  }


  // Delete A Guichet
  static async deleteGuichet(req: Request, res: Response) {
    const { id } = req.params;
    const guichetRepository = AppDataSource.getRepository(Guichet);
    const guichet = await guichetRepository.findOne({
      where: { id },
    });
    await guichetRepository.remove(guichet);
    return res.status(200).json({ message: "Guichet deleted successfully", guichet});
  }

  // Statistics
  static async totalGuichet(req: Request, res: Response) {
    const guichetRepository = AppDataSource.getRepository(Guichet);
    const nbr = await guichetRepository.count();
    if( nbr > 0 ) {
        return res.status(200).json({message : "Nombre des Guichets  dans la base de données " , nbr})
    }
    else {
        return res.json({message : "Table est vide"})
    }
  }
}
