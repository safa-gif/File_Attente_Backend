import { Request, Response } from "express";
// import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Feedback } from './../entity/Feedback.entity';

// Get All Feedbackx
export class FeedbackController {
  static async getAllFeedbacks(req: Request, res: Response) {
  
    const feedRepository = AppDataSource.getRepository(Feedback);
    const feedbacks = await feedRepository.find();
    // console.log("Here result after find",users);
    if(feedbacks!= null || undefined){
      return res.status(200).json({ 
        message: "This are all the feedbacks", 
      data: feedbacks});
    }
    else {
      res.status(500).json({
        message : "Feedbacks cannot be displayed!!"
      })
    }
}

  // Create A New Feedback
  static async createFeedback(req: Request, res: Response) {
    const { email, avis } = req.body  ;
   const feedback = new Feedback();
   feedback.email = email;
   feedback.avis = avis;
  //  feedback.dateCreation = dateCreation;

    const feedbackRepository = AppDataSource.getRepository(Feedback);
    const existantFeed = await feedbackRepository.findOne({
      where : {avis: avis}
    })
    if(existantFeed!= null) {
      return res.status(500).json({ message : "Avis already exists!!!"})
    }
    else {
      await feedbackRepository.save(feedback);
      return res.status(200).json({ message : "Feedback has been created successfully", feedback})
    }
    
  }

  // Update A Feedback
    static async updateFeedback(req: Request, res: Response) {
    const { id } = req.params;
    const { avis, email} = req.body;
    const feedRepository = AppDataSource.getRepository(Feedback);
    const feedback = await feedRepository.findOne({where: { id },
    });
    feedback.email = email;
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
      {where : { id}}
    )
    .then((feedback)=>{
      // console.log("The searched Feddback ",feedback)
      res.status(201).json({ message: "Feedback has been found by ID ", feed:feedback});

    })
    .catch((err)=> {
      res.status(500).json({ message : " Could not find the feedback with this ID ", error: err})

    })
  }

//Getfeedback By Id
static async getFeedbackByIdUser(req:Request ,res :Response){
  const {user} = req.params ;
  const feedbackRepository=AppDataSource.getRepository(Feedback);
  const feedback = await feedbackRepository.find(
    {where : {user}}
  )
  .then((feedback)=>{
    // console.log("Hello ",feedback)
    res.status(201).json({ message: "Feedback has been found by UserID ", data:feedback});

  })
  .catch((err)=> {
    res.status(500).json({ message : " Could not find the feedback with this UserID ", error: err})

  })
}
  //getFeedback By idUSER


  //Get Feedback By Email
  static async getFeedbackByEmail(req:Request ,res :Response){
    const {email} = req.body ;
    const feedbackRepository=AppDataSource.getRepository(Feedback);
    const feedback = await feedbackRepository.find(
      {where : { email},}
    )
    .then((feedback)=>{
      res.status(201).json({ message: "Feedback has been by User Email", data:feedback});

    })
    .catch((err)=> {
      res.status(500).json({ message : " Could not find the feedback with this ID ", error: err})

    })
  }


}
