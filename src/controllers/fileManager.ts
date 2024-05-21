
// QueueManager.ts
import { File } from '../entity/File.entity';
import { Ticket } from '../entity/Ticket.entity';
import { AppDataSource } from './../data-source';

export class FileManager {

 async startQueue(fileID: number) {
    var strId = "fileID"
    const fileRepository = AppDataSource.getRepository(File);
    
    const file = await fileRepository.findOne({where:{id:strId}});
    if (file) {
      // Mettez en œuvre la logique pour démarrer la file d'attente ici
    }
  }

  async stopQueue(fileID: number) {
    var strId = "fileID"
    const fileRepository = AppDataSource.getRepository(File);
    const file = await fileRepository.findOne({where:{id:strId}});
    if (file) {
      // Mettez en œuvre la logique pour arrêter la file d'attente ici
    }
  }
  async enqueueTicket(fileID: number) {
    var strId = "fileID"

    const fileRepository = AppDataSource.getRepository(File);
    const ticketRepository = AppDataSource.getRepository(Ticket);
    const file = await fileRepository.findOne({where:{id:strId}},
        //  { relations: ['tickets'] }
        );

    if (file) {
      const newTicket = ticketRepository.create(
        {NbrClientAttente: file.tickets.length + 1}
        // { number: file.tickets.length + 1, file }
    );
      await ticketRepository.save(newTicket);
      return newTicket;
    } else {
      throw new Error('File not found');
    }
  }
}