import {Request, Response} from "express";
import { TicketService } from "../services/ticket.service";
import { AppDataSource } from "../data-source";
import { Ticket } from "../entity/Ticket.entity";
import { File } from "../entity/File.entity";
 export class TicketController {

public static async creerTicket(req:Request, res:Response){
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const fileRepository = AppDataSource.getRepository(File);
    const {file, codeClient, codeProd, idGuichet, status, NbrClientAttente} = req.body
    const ticket = new Ticket();
    ticket.codeClient = codeClient;
    ticket.codeProd = codeProd;
    ticket.idGuichet = idGuichet;
    ticket.status = status;
    ticket.NbrClientAttente= 0;
    ticket.file = null;
    ticket.description = "Ticket Réservé";

   if(ticket!=null ||undefined){
    await ticketRepository.save(ticket);
   return res.status(200).json({
    message:"Ticket crée avec succés!!",
    ticket
   })
   }
   else {
    return res.status(400).json({message:"Impossible de réserver votre ticket"})
   }

}

public static async getAllTickets(req:Request, res:Response){
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const today= new Date();
    const tickets = await ticketRepository.find()
    if(tickets!== null || undefined){
       return res.status(200).json({message:"Les tickets d'aujourd'hui",tickets})
    }
    else{
       return res.status(500).json({message:"Pas de tickets aujourd'hui"})
    }
}

public static async deleteTicket(req:Request, res:Response){
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const ticketId = parseInt(req.params.id);
    const ticket = await ticketRepository.findOneBy({id:ticketId});
    if(ticket !== null || undefined){
        await ticketRepository.remove(ticket);
        return res.status(200).json({message:"Ticket supprimé avec succés!!"})
    }
    else{
        return res.status(500).json({message:"Ticket non trouvé!!"})
    }

}
public static async affecteTicketFile(req:Request, res:Response){
const ticketRepository = AppDataSource.getRepository(Ticket);
const fileRepository = AppDataSource.getRepository(File);
const ticketId = parseInt(req.params.id);
const {guichetId, file} = req.body;
const ticket = await ticketRepository.createQueryBuilder()
}


public static async getTicketById(req: Request, res:Response){
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const id = parseInt(req.params.id);
    const ticket = await ticketRepository.find({where: {id:id}});
    if(ticket !== null || undefined){
        return res.status(200).json({message:"Ticket trouvé!!",data: ticket})
    }
    else{
        return res.status(500).json({message:"Ticket non trouvé!!"})
    }

}

public static async updateTicket(req:Request, res:Response){
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const ticketId = parseInt(req.params.id);
    const ticket = await ticketRepository.findOneBy({id:ticketId});
    const fileRepository = AppDataSource.getRepository(File);
    // const file = await fileRepository.find
    if(ticket !== null || undefined){
        const {description,status} = req.body;
        ticket.description = description;
        ticket.status = status;
        // ticket.file = file;
        await ticketRepository.save(ticket);
        return res.status(200).json({message:"Ticket mis à jour!!",ticket})
    }
    else{
        return res.status(500).json({message:"Ticket non trouvé!!"})
    }

}


public static async countTicket(req:Request, res:Response){
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const ticketNBR = await ticketRepository.count();
    if(ticketNBR>0){
        return res.status(200).json({message:"Ticket trouvé!!",ticketNBR})
    }
    else{
        return res.status(500).json({message:"Pas de tickets trouvée!"})
    }
    // const today=new Date()
}


public static async searchTicketByUserId(req:Request, res:Response){
    const {codeClient} = req.body;

    const ticketRepository = AppDataSource.getRepository(Ticket);
    const ticket = ticketRepository.find(
        {where:{codeClient}
    })
    .then((ticket)=>{
        return res.status(200).json({message:"Ticket trouvée par Id Client!!",data: ticket})
    })
    .catch((error)=>{
        return res.status(500).json({message:"Ticket non trouvée par cet Id Cient!!",erreur:error})
    })
   
}
public static async searchtTicketByGuichetId(req:Request, res:Response){
    const {idGuichet} = req.body;
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const ticket = ticketRepository.find({
        where:{idGuichet}
    })
    .then((ticket)=>{
        return res.status(200).json({message:"Ticket trouvée par Id Guichet",data:ticket})
    })
    .catch((error)=>{
        return res.status(500).json({message:"Ticket non trouvée par cet Id Guichet", erreur:error})
    })
}

}