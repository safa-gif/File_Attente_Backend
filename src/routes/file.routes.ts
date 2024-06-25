import * as express from "express";
import { fileController } from "../controllers/file.controller";
const Router = express.Router();



Router.post("/creer", fileController.createFile);
Router.get("/get-files", fileController.getFiles);
Router.put("/update-file/:id", fileController.updateFile);
Router.delete("/delete-file/:id", fileController.deleteFile);
Router.get("/count-tickets", fileController.findFilesTickets)
Router.get("/get-files-users/:id", fileController.displayFileByAssignedUser);
Router.get("/get-files-by-guichet", fileController);
Router.get('/get-file-details/:id', fileController.detailsFileById)





export { Router as fileRouter };
