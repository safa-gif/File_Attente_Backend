import { Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { File } from "../entity/File.entity";
import { Ticket } from "../entity/Ticket.entity";
import { FileManager } from "./fileManager";
export class fileController {



    async createQueue(nom: string, temps_demarrage: Date,temps_arret: Date): Promise<File> {
        const queueRepository = await AppDataSource.getRepository(File);
        const fileN = new File();
        fileN.nom= nom;
        fileN.temps_demarrage = temps_demarrage;
        fileN.temps_arret = temps_arret;
    
       return await queueRepository.save(fileN);
        // const newQueue =  this.queueRepository.create({ name, startTime, endTime });
        // return await this.queueRepository.save(newQueue);
      }
      async enqueueTicket(queueId: number, title: string, description: string, priority: string): Promise<Ticket> {
        const queueRepository = await AppDataSource.getRepository(File);
       const strId = queueId.toString()
        const queue = await queueRepository.findOneBy({ id: strId });
        if (!queue) {
          throw new Error('Queue not found')
        }
        const ticketRepository = await AppDataSource.getRepository(Ticket);
    
        // const newTicket = ticketRepository.create({ title, description, priority, status: 'en attente' });
       
       const newTicket= new Ticket();
       newTicket.description = "Ticket essai ";
       newTicket.priorite = 1;
       newTicket.etat= "en attente"
        await ticketRepository.save(newTicket);
        queue.numCurrent++;
        queue.ticketsRestantes++;
        await queueRepository.save(queue);
        newTicket.files= [queue];
        await ticketRepository.save(newTicket);
        return newTicket;
    }
    
    async startQueue(queueId: number): Promise<File> {
        const queueRepository = await AppDataSource.getRepository(File);
        const strId = queueId.toString()
    
        const queue = await queueRepository.findOne({ where:{id: strId}});
        if (!queue) {
          throw new Error('Queue not found');
        }
    
        queue.temps_demarrage = new Date();
        return await queueRepository.save(queue);
      }
      async stopQueue(queueId: number): Promise<File> {
        const queueRepository = await AppDataSource.getRepository(File);
        const strId = queueId.toString()
    
        const queue = await queueRepository.findOne({ where:{id: strId} });
        if (!queue) {
          throw new Error('Queue not found');
        }
    
        queue.temps_arret = new Date();
        return await queueRepository.save(queue);
      }
    
      async getQueueById(queueId: number): Promise<File> {
        const queueRepository = await AppDataSource.getRepository(File);
        const strId = queueId.toString()
        return await queueRepository.findOne({where: { id: strId }});
      }
      async getQueues(): Promise<File[]> {
        const queueRepository = await AppDataSource.getRepository(File);
        return await queueRepository.find();
      }
    
    static   async getTicketsByQueueId(queueId: number): Promise<Ticket[]> {
        const queueRepository = await AppDataSource.getRepository(File);
        const tikcetRepository = await AppDataSource.getRepository(Ticket);
        const strId = queueId.toString()
    
        const queue = await queueRepository.findOne({ where:{id:strId}});
        if (!queue) {
          throw new Error('Queue not found');
        }
    
        return queue.tickets;
      }

     static  async startFile (req: Request, res: Response)  {
        const fileID = parseInt(req.params.id);
        const queueManager = new FileManager();
      
        try {
          await queueManager.startQueue(fileID);
          res.json({ message: 'Queue started successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error starting queue', error: error.message });
        }
      };

     static  async stopFile (req: Request, res: Response) {
        const fileID = parseInt(req.params.id);
        const queueManager = new FileManager();
      
        try {
          await queueManager.stopQueue(fileID);
          res.json({ message: 'Queue stopped successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error stopping queue', error: error.message });
        }
      };
      
  static  async enqueueTicketFile (req: Request, res: Response){
        const fileID = parseInt(req.params.fileID);
        const queueManager = new FileManager();
      
        try {
          const newTicket = await queueManager.enqueueTicket(fileID);
          res.status(201).json(newTicket);
        } catch (error) {
          res.status(500).json({ message: 'Error enqueuing ticket', error: error.message });
        }
      };


      // Créer une nouvelle file
    static  async createFile  (req: Request, res: Response) {
        const { nom,temps_demarrage, temps_arret, guichetId, user } = req.body;

            try {
              const file = new File();
              file.nom = nom;

              file.temps_demarrage = temps_demarrage;
              file.temps_arret = temps_arret;
              file.numCurrent++;
              file.ticketsRestantes++;
              file.guichetId = guichetId;
              file.user=user;

             const fileRepository= await AppDataSource.getRepository(File);
              await fileRepository.save(file);

              return res.status(201).json({message:"File Créé avec succès!!",file});
            } catch (error) {
              return res.status(500).json({ message: 'Failed to create file, SORRY I AM NOT SORRY' });
            }
};


             static stopFileT = async (req: Request, res: Response) => {
                const fileId = parseInt(req.params.id);
                var strId= fileId.toString()
                const fileRepository = AppDataSource.getRepository(File);

                try {
                  const file = await fileRepository.findOneOrFail({where:{id:strId}});
                  file.temps_arret = new Date();
                  await fileRepository.save(file);
                  res.json({ message: 'File stopped successfully' });
                } catch (error) {
                  res.status(500).json({ message: 'Error stopping file', error: error.message });
                }
              };


}