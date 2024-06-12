import * as express from "express";
import { fileController } from "../controllers/file.controller";
const Router = express.Router();



Router.post("/creer", fileController.createFile);
Router.get("/get-files", fileController.getFiles);
Router.put("/update-file/:id", fileController);
Router.delete("/delete-file/:id", fileController.deleteFile);
Router.get("/count-tickets", fileController.findFilesTickets)






export { Router as fileRouter };
