import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Guichet } from "../entity/Guichet.entity";
import { Bureau } from "../entity/Bureau.entity";
// Get All Guichetx
export class GuichetController {
  static async getAllGuichets(req: Request, res: Response) {

    const guichetRepository = AppDataSource.getRepository(Guichet);
    const Guichetx = await guichetRepository.find();
    
    return res.status(200).json({ message: "This are all the guichets", Guichetx});
  }

  // Create A New Guichet
  static async createGuichet(req: Request, res: Response) {
    const {nomGuichet ,user, bureau, produit} = req.body  ;
    const guichet = new Guichet();
    // guichet.id = id;
    guichet.nomGuichet= nomGuichet;
    guichet.user = user;
    guichet.bureau = bureau;
    // guichet.produit = produit;

    const guichetRepository = AppDataSource.getRepository(Guichet);
    const guichetExistant = await guichetRepository.find({
      where:  {nomGuichet : nomGuichet} 
    })
    if(guichetExistant!=null){
      return res.status(500).json({
        message: "Guichet Existant Déjà!!"
      })
    }
    await guichetRepository.save(guichet);
    return res.status(200).json({ message: "Guichet has been created successfully", 
    guichet});
  }

  // Update A Guichet
    static async updateGuichet(req: Request, res: Response) {
    const { id } = req.params;
    const {nomGuichet,  produit} = req.body;
    const guichetRepository = AppDataSource.getRepository(Guichet);
    const guichet = await guichetRepository.findOne({where: { id: id },
    });
    guichet.nomGuichet = nomGuichet;
    // guichet.file = file;
    // guichet.bureau = bureau;
    // guichet.produit = produit;
    await guichetRepository.save(guichet);
    if(guichet !== null || undefined) {
      return res.status(200).json({ message: "Guichet has been  updated successfully", guichet });
    }
    else {
      res.status(500).json({ message: "The has been an error while udpdating this guichet"});
    }
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
    .catch((error)=> {
      res.status(500).json({
        message : " Could not find the Guichet with this ID ", error: error
      })
    })
  }
  
    
}
