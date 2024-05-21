import * as express from "express";
import { GuichetController } from './../controllers/guichet.controller';
const Router = express.Router();

//getting all guichets
Router.get("/guichets",GuichetController.getAllGuichets);



// creating a new guichet
Router.post("/create-guichet", GuichetController.createGuichet);

//Updating guichet
Router.put("/update-guichet/:id",GuichetController.updateGuichet);

// Delete guichet
Router.delete("/delete-guichet/:id",GuichetController.deleteGuichet);

// Find guichet by Id
Router.get("/find-guichet/:id",GuichetController.getGuichetById);

// Count all guichets
Router.get("/count", GuichetController.totalGuichet);

//Get Guihcets By BureauID
Router.get('/find-gchtsByBuId', GuichetController.getGuichetsByBurId);

//Get Guichet bY Product ID
Router.get('/find-gchByPro', GuichetController.getGuichetsByCodeProd)

//Get Guichet by User ID

Router.get('/find-gchUser/:user', GuichetController.getGuichetByUserId)

//Get Guihcets By BureauID
Router.get('/find-gchtsByBureau/:bureau', GuichetController.getGuichetsByBureau);

//get Guihcet By Breau& Product Id
// Router.get('/find-gchByBurCode/:bureau', GuichetController.getGuichetsByBurByProdId)

export { Router as guichetRouter };
