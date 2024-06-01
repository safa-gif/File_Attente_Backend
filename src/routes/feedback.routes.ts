import * as express from "express";
import { FeedbackController } from './../controllers/feedback.controller';
const Router = express.Router();

//getting all feedbacks
Router.get("/feedbacks",FeedbackController.getAllFeedbacks);



// creating a new feedback
Router.post("/create-feedback", FeedbackController.createFeedback);

//Updating a feedback
Router.put("/update-feedback/:id",FeedbackController.updateFeedback);
// Router.put("/update/:id");


// Delete  a feedback
Router.delete("/delete-feedback/:id",FeedbackController.deleteFeedback);

// Find feedback by Id
Router.get("/find-feedback/:id",FeedbackController.getFeedbackById);

// Count all feedbacks
Router.get("/count", FeedbackController.totalFeedback);

//Find Feedanck By UserEmail
Router.get("/findUser-feedback", FeedbackController.getFeedbackByEmail)

//Find Feedback By UserId 

Router.get("/findFeedback-userId/:id", FeedbackController.getFeedbackByIdUser)

export { Router as feedbackRouter };
