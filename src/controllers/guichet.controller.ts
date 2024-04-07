import { Request, Response } from "express";
// import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Guichet } from "../entity/Guichet.entity";
import { Bureau } from "../entity/Bureau.entity";
// Get All Guichetx
export class GuichetController {
  static async getAllGuichets(req: Request, res: Response) {

    const guichetRepository = AppDataSource.getRepository(Guichet);
    const Guichetx = await guichetRepository.find();
    // console.log("Here result after find",users);
    
    return res.status(200).json({ message: "This are all the guichets", Guichetx});
  }

  // Create A New Guichet
  static async createGuichet(req: Request, res: Response) {
    const {produit } = req.body  ;
   const guichet = new Guichet();
//    guichet.localisation = localisation;
    const guichetRepository = AppDataSource.getRepository(Guichet);
    const guichetExistant = await guichetRepository.find({
      where:{produit : produit},
    })
    if(guichetExistant!=null){
      return res.status(500).json({
        message: "Code Produit Existe déjà "
      })
    }
    await guichetRepository.save(guichet);
    return res.status(200).json({ message: "Guichet has been created successfully", guichet});
  }

  // Update A Guichet
    static async updateGuichet(req: Request, res: Response) {
    const { id } = req.params;
    // const {localisation} = req.body;
    const guichetRepository = AppDataSource.getRepository(Guichet);
    const guichet = await guichetRepository.findOne({where: { id: id },
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
      where: { id : id },
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

  // Afficher un guichet by Id

  static async getGuichetById(req: Request, res: Response) {
    const {id} = req.params ;
    const guichetRepository = AppDataSource.getRepository(Guichet);
    const guichet = await guichetRepository.findOne({
      where : {id: id},
    })
    .then((guichet)=>{
      res.status(200).json({ message: "Guichet  found by ID ", data: guichet})
    })
  }
  //Affecter guichet A un bureau
    
}
