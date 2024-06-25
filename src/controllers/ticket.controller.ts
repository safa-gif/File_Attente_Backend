import {Request, Response} from "express";
import { TicketService } from "../services/ticket.service";
import { AppDataSource } from "../data-source";
import { Ticket } from "../entity/Ticket.entity";
import { File } from "../entity/File.entity";
// import { GuichetResponse } from './../dto/guichet.dto';
import { Guichet } from "../entity/Guichet.entity";
import { guichetRouter } from "../routes/guichet.routes";
 export class TicketController {

public static async creerTicket(req:Request, res:Response){
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const fileRepository = AppDataSource.getRepository(File);
    const { codeClient, codeProd, idGuichet,  NbrClientAttente} = req.body
    const ticket = new Ticket();
    ticket.codeClient = codeClient;
    ticket.codeProd = codeProd;
    ticket.idGuichet = idGuichet;
    ticket.status = "en attente";
    ticket.NbrClientAttente= 0;
    ticket.file;
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
       return res.status(200).json({message:"Les tickets",tickets})
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
    const {description,status,idFile} = req.body;
        ticket.description = description;
        ticket.status = status;
        ticket.idFile =idFile;
        // ticket.file = file;
        await ticketRepository.save(ticket);
    if(ticket !== null || undefined){
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

public static async countTicketEnAttente(req:Request, res:Response){
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const [count, nbr]= await ticketRepository.findAndCount({
        where:{status:"en attente"}
    })
    .then((count)=>{
        return res.status(200).json({message:"Tickets en attente trouvées",data:count, num: nbr})

    })
    .catch((error)=>{
        return res.status(200).json({message:"Tickets en attente non trouvées",erreur:error})

    })
   
}
public static async countTicketEnCours(req:Request, res:Response){
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const [count, nbr]= await ticketRepository.findAndCount({
        where:{status:"en cours"}
    })
    .then((count)=>{
        return res.status(200).json({message:"Tickets en attente trouvées",data:count, num: nbr})

    })
    .catch((error)=>{
        return res.status(200).json({message:"Tickets en attente non trouvées",erreur:error})

    })
   
}
// public static async getOpByTicketId(req:Request, res:Response){
//     const ticketRepository = AppDataSource.getRepository(Ticket);
//     const guichetRepository = AppDataSource.getRepository(Guichet);
//     const idticket = req.params.id;
//     const ticket = await ticketRepository.find({
//         where : {id: idticket}
//     })
//     if(ticket!= null){
//         const ticketlength = ticket.length;
//         for(let i=0; i<ticketlength;i++){
//             var guichetId = ticket[i].idGuichet;
//         }
//         var idGuichet = req.params.id;
//         idGuichet = guichetId;
//         const guichet = await guichetRepository.find({
//             where : {id: guichetId}
//         })
//         .then((guichet)=>{
//             return res.status(200).json({message:"Guichet trouvé",data:guichet})
//         })
//         .catch(()=>{
//             return res.status(404).json({message:"Guichet non trouvé"})
//         })
//         // const guichet = await GuichetRepository.find({
//         //     where : {}
//         // })
//     }

// }
}