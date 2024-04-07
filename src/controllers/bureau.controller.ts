import { Request, Response } from "express";
// import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Bureau } from './../entity/Bureau.entity';
import { Guichet } from "../entity/Guichet.entity";
// Get All Bureaux
export class BureauController {
  static async getAllBureaux(req: Request, res: Response) {

    const bureauRepository = AppDataSource.getRepository(Bureau);
    const bureaux = await bureauRepository.find();
    // console.log("Here result after find",users);
    
    return res.status(200).json({ message: "This are all the user", bureaux});
  }

  // Create A New Bureau
  static async createBureau(req: Request, res: Response) {
    const {localisation } = req.body  ;
   const bureau = new Bureau();
   //ajouter le role admin lors de la création du bureau 
   bureau.localisation = localisation;
    const bureauRepository = AppDataSource.getRepository(Bureau);
    const burExist = await bureauRepository.findOne({where : 
      {localisation: localisation}})
    if(burExist!= null) {
     return res.status(500).json({
      message : "Duplicate Entry"
     })
    }
    else {
      await bureauRepository.save(bureau);
      return res.status(200).json({ message: "Bureau has been created successfully", bureau});
    }
   
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
  // Creating a new guichet for the bureau 

  static async createGuichetforBureau(req: Request, res: Response){
    const {id} = req.parmas;

    const bureauRepository=AppDataSource.getRepository(Bureau);
    const bureau = await bureauRepository.find(
      {where : {id:id}}
    );
    if(!bureau){
      console.log("I couldn't find this bureau");
          res.status(404).json({ message: "Bureau introuvable, veuillez créer un bureau tout d'abord"});
      // Je dois créer ce bureau avec ce guichet
    }
    
    // const nouvGuichet = new Guichet();
    // const {idGuichet, bureauGuichet} = req.body;
    // nouvGuichet.id = idGuichet;
    // nouvGuichet.bureau = bureauGuichet;
    // console.log("This is the ne guichet", nouvGuichet)
    // const guichetRepository = AppDataSource.getRepository(Guichet);
    // await guichetRepository.save(nouvGuichet);
    // res.status(200).json({
    //   message: "Guichet saved successfully",
    //   data : nouvGuichet
    // })
    
    // const {idGuichet} = req.params;
    // const guichet = new Guichet();
    // guichet.id = idGuichet;
    // guichet.bureau=id;
    // const guichetRepository = AppDataSource.getRepository(Guichet);
    // const existGuichet = await guichetRepository.findOne({
    //   where : {id: idGuichet}
    // })
    // if(existGuichet!=null){
    //   return res.status(500).json({
    //     message: "Guichet exists in the database already!!!"
    //   })
    // }
    // else {
    //   await guichetRepository.save(guichet);
    //   console.log("This is your guichet ",guichet)
    //   return res.status(20).json({
    //     message : "Guichet has been saved successfuly in the database already!!!",
    //     data : guichet
    //   })
    // }
   
  }
  static async getAllGuichetsByBureauId (req:Request ,res: Response) {
    const {id} = req.parmas;
   
   
  }

}
