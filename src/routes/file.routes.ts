import * as express from "express";
import { fileController } from "../controllers/file.controller";
const Router = express.Router();

//getting all files
Router.get("/files",fileController);



// creating a new files
Router.post("/create-file", fileController.createFile)
//Updating bureau
Router.put("/stop-file/:id",fileController.stopFileT);

// Delete bureau
// Router.delete("/delete-bureau/:id",fileController.deleteBureau);

// Find bureau by Id
// Router.get("/find-bureau/:id",fileControllerr.getBureauById);

// Count all bureaux
Router.get("/count", fileController);



export { Router as fileRouter };
