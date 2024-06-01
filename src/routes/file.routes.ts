import * as express from "express";
import { fileController } from "../controllers/file.controller";
const Router = express.Router();



Router.post("/creer", fileController.createFile);
Router.get("get-files", fileController)
Router.put("upfate-file", fileController)
Router.delete("delete-file", fileController)






export { Router as fileRouter };
