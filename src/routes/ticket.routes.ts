import * as express from "express";
import { TicketController } from "../controllers/ticket.controller";
const Router = express.Router();

//getting all files
Router.get("/files", TicketController);



// creating a new files
Router.post("/create-ticket", TicketController.createTicketF)
//Updating bureau
Router.put("/update-ticket/:id", TicketController.updateTicketF);

// Delete bureau
// Router.delete("/delete-bureau/:id", ticketController.deleteBureau);

// Find bureau by Id
Router.get("/deletet-ticket/:id", TicketController.deleteTicketF);

// Count all bureaux
Router.get("/count", TicketController);



export { Router as fileRouter };
