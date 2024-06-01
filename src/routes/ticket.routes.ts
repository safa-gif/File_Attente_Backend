import * as express from "express";
import { TicketController } from "../controllers/ticket.controller";
const Router = express.Router();

//getting all files

Router.get("/get-tickets",TicketController.getAllTickets)
Router.post("/create-ticket", TicketController.creerTicket);
Router.put("/update-ticket/:id", TicketController.updateTicket);
Router.delete("/delete-ticket/:id", TicketController.deleteTicket);


// Count all bureaux
Router.get("/count", TicketController.countTicket);



export { Router as ticketRouter };
