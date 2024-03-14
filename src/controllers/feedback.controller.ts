import { Request, Response } from "express";
// import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Feedback } from './../entity/Feedback.entity';

// Get All Feedbackx
export class FeedbackController {
  static async getAllFeedbacks(req: Request, res: Response) {
    // const data = cache.get("data");
    // if (data) {
    //   console.log("serving from cache");
    //   return res.status(200).json({
    //     data,
    //   });
    // } else {
    //   console.log("serving from db");
    //   const FeedbackRepository = AppDataSource.getRepository(Feedback);
    //   const Feedbackx = await FeedbackRepository.find();
    //   cache.put("data", Feedbackx, 10000);
    //   return res.status(200).json({
    //     data: Feedbackx,
    //   });
    // }
    const feedRepository = AppDataSource.getRepository(Feedback);
    const feedbacks = await feedRepository.find();
    // console.log("Here result after find",users);
    
    return res.status(200).json({ message: "This are all the users", feedbacks});
  }

  // Create A New Feedback
  static async createFeedback(req: Request, res: Response) {
    const {avis } = req.body  ;
   const feedback = new Feedback();
   feedback.avis = avis;
    const feedbackRepository = AppDataSource.getRepository(Feedback);
    await feedbackRepository.save(feedback);
    return res.status(200).json({ message: "Feedback has been created successfully", feedback});
  }

  // Update A Feedback
    static async updateFeedback(req: Request, res: Response) {
    const { id } = req.params;
    const {avis} = req.body;
    const feedRepository = AppDataSource.getRepository(Feedback);
    const feedback = await feedRepository.findOne({where: { id },
    });
    feedback.avis = avis;
    await feedRepository.save(feedback);
    return res.status(200).json({ message: "Feedback has been  updated successfully", feedback });
  }


  // Delete A Feedback
  static async deleteFeedback(req: Request, res: Response) {
    const { id } = req.params;
    const FeedbackRepository = AppDataSource.getRepository(Feedback);
    const feedback = await FeedbackRepository.findOne({
      where: { id },
    });
    await FeedbackRepository.remove(feedback);
    return res.status(200).json({ message: "Feedback deleted successfully", feedback});
  }

  // Statistics
  static async totalFeedback(req: Request, res: Response) {
    const FeedbackRepository = AppDataSource.getRepository(Feedback);
    const nbr = await FeedbackRepository.count();
    if( nbr > 0 ) {
        return res.status(200).json({message : "Nombre des Feedbackx  dans la base de données " , nbr})
    }
    else {
        return res.json({message : "Table est vide"})
    }
  }

  //Getfeedback By Id
  static async getFeedbackById(req:Request ,res :Response){
    const {id} = req.params ;
    const feedbackRepository=AppDataSource.getRepository(Feedback);
    const feedback = await feedbackRepository.findOne(
      {where : {id}}
    )
    .then((feedback)=>{
      console.log("Hello ",feedback)
      res.status(201).json({ message: "Feedback has been found by ID ", data:feedback});

    })
    
  }
}
