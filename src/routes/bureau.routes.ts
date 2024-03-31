import * as express from "express";
import { BureauController } from "../controllers/bureau.controller";
const Router = express.Router();

//getting all bureaux
Router.get("/bureaux",BureauController.getAllBureaux);



// creating a new bureau
Router.post("/create-bureau", BureauController.createBureau);

//Updating bureau
Router.put("/update-bureau/:id",BureauController.updateBureau);

// Delete bureau
Router.delete("/delete-bureau/:id",BureauController.deleteBureau);

// Find bureau by Id
Router.get("/find-bureau/:id",BureauController.getBureauById);

// Count all bureaux
Router.get("/count", BureauController.totalBureau);


//AFFECTER UN GUICHET A UN BUREAU
Router.get("/create-guichet/:id",BureauController.createGuichetforBureau)

export { Router as bureauRouter };
