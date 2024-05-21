import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Ticket } from "../entity/Ticket.entity";
import { File } from "../entity/File.entity";

 export class TicketController {
  

  

  async addTicket(req: Request, res: Response)  {
    const { fileId } = req.params;
  
    try {
      const fileRepository = AppDataSource.getRepository(File);
      const ticketRepository = AppDataSource.getRepository(Ticket);
  
      // Trouver la file correspondante
      const file = await fileRepository.findOne(fileId);
  
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
  
      // Créer un nouveau ticket
      const ticket = new Ticket();
      ticket.date = new Date();
      ticket.etat = 'En attente';
    //   ticket.files = file['id'];
  
      // Mettre à jour le numéro de ticket courant et le nombre de tickets restants dans la file
      file.numCurrent++;
      file.ticketsRestantes++;
  
      await ticketRepository.save(ticket);
      await fileRepository.save(file);
  
      return res.status(201).json(ticket);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add ticket' });
    }
  };
  
  // Modifier l'état d'un ticket
 async updateTicketStatus(req: Request, res: Response){
    const { ticketId } = req.params;
    const { status } = req.body;
  
    try {
      const ticketRepository = AppDataSource.getRepository(Ticket);
  
      const ticket = await ticketRepository.findOne(ticketId);
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      ticket.etat = status;
  
      await ticketRepository.save(ticket);
  
      return res.status(200).json(ticket);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update ticket status' });
    }
  };
  
  // Supprimer un ticket d'une file
   deleteTicket = async (req: Request, res: Response) => {
    const { ticketId } = req.params;
  
    try {
      const ticketRepository = AppDataSource.getRepository(Ticket);
      const fileRepository = AppDataSource.getRepository(File);
  
      const ticket = await ticketRepository.findOne(ticketId);
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Mettre à jour le nombre de tickets restants dans la file
      const file = await fileRepository.findOne({where:{}});
      file.ticketsRestantes--;
  
      await fileRepository.save(file);
      await ticketRepository.remove(ticket);
  
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete ticket' });
    }
  }

  
   static createTicketF = async (req: Request, res: Response) => {
    const fileId = req.params.fileId;
    var strId = fileId
    const fileRepository =AppDataSource.getRepository(File);
    const ticketRepository =AppDataSource.getRepository(Ticket);
  
    try {
      const file = await fileRepository.findOneOrFail(fileId);
      const newTicket = ticketRepository.create({files: fileId,
        // etat: 'en attente',
       });
      await ticketRepository.save(newTicket);
      file.ticketsRestantes += 1;
      await fileRepository.save(file);
      res.status(201).json(newTicket);
    } catch (error) {
      res.status(500).json({ message: 'Error creating ticket', error: error.message });
    }
  };
  
   static updateTicketF = async (req: Request, res: Response) => {
    const ticketId = parseInt(req.params.id);
    const { status } = req.body;
    const ticketRepository =AppDataSource.getRepository(Ticket);
  
    try {
      const ticket = await ticketRepository.findOneOrFail({where:{id:ticketId}});
      ticket.etat = status;
      await ticketRepository.save(ticket);
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: 'Error updating ticket', error: error.message });
    }
  };
  
    static deleteTicketF = async (req: Request, res: Response) => {
    const ticketId = parseInt(req.params.id);
    const ticketRepository =AppDataSource.getRepository(Ticket);
  
    try {
      await ticketRepository.delete(ticketId);
      res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting ticket', error: error.message });
    }
  };

}