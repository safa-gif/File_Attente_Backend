import { AppDataSource } from "../data-source";
import { Ticket } from '../entity/Ticket.entity';
import { File } from "../entity/File.entity";
import { User } from '../entity/User.entity';


export class TicketService {
    // static ticketRepository: any;
    // // // static cancelTicket(arg0: number) {
    // // //     throw new Error("Method not implemented.");
    // // // }
    // // static createTicket(queueId: any, number: any, date: any) {
    // //     throw new Error("Method not implemented.");
    // // }
    static ticketRepository = AppDataSource.getRepository(Ticket);
    static async createTicket(queueId: number, number: number, date: Date, 
        // etat:any
    ) {
        const ticket = new Ticket();
        ticket.file = { id: queueId } as any;
       
        // ticket.etat = 'réservé';
        return await this.ticketRepository.save(ticket);
    }

    static async cancelTicket(ticketId: number) {
        return await this.ticketRepository.delete(ticketId);
    }

    // autres méthodes pour traiter les tickets
    
}