import * as express from "express";
import { authentification } from "../middleware/authentification";
import { BureauController } from "../controllers/bureau.controller";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.get("/bureau", authentification, BureauController.getAllBureaux);
Router.post("/bureau", 
authentification, 
authorization(["admin"]), 
BureauController.createBureau);

Router.put(
  "/bureau/:id",
  authentification,
  authorization(["admin"]),
  BureauController.updateBureau
);
Router.delete(
  "/bureau/:id",
  authentification,
  authorization(["admin"]),
  BureauController.deleteBureau
);
export { Router as bureauRouter };
