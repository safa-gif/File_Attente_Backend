import { Request, Response} from "express";
import { File } from "../entity/File.entity";
import { Ticket } from "../entity/Ticket.entity";
import { FileService } from "../services/file.service";
import { AppDataSource } from "../data-source";
export class fileController {

      // Créer une nouvelle file
     static  async createFile  (req: Request, res: Response) {
        const { nom,  idGuichet, status,user, idFile} = req.body;
        const fileRepository=  AppDataSource.getRepository(File);

            // const dateE = new Date();
            const file = new File();
                file.nom = nom;
                file.users= user;
                file.status = status;
                // file.guichets = idGuichet;
                // file.nbrClientSuivant=+2;
                // file.numCurrent=+1;
                // file.tickets
                // file.ticketsRestantes= +1;
                file.idGuichet = idGuichet;
                // file.guichets = guichet;
                await fileRepository.save(file);

                const ticketRepository = AppDataSource.getRepository(Ticket);
                const ticketFile = await ticketRepository.find({
                    where:{idGuichet:idGuichet}
                });
                console.log("tickets", ticketFile);
                if(ticketFile !== null && ticketFile.length > 0){
                    const fileT = ticketFile.length;
                    console.log("file Ticket ", fileT);

                    for(let i=0; i< fileT;i++){
                        if(ticketFile[i].idFile === null){
                            ticketFile[i].idFile = file.id;
                            await ticketRepository.save(ticketFile[i])
                        }
                    }
                    // if(ticketFile !=){}
                }

            if(file != null && ticketFile!=null){
                 return res.status(201).json({message:"File Créer avec succès!!",file});
            }
            else{
                return res.status(500).json({ message: 'Failed to create file, SORRY I AM NOT SORRY' });
            }
        
        };

        static async updateFile(req:Request, res:Response){
            const id = req.params.id;
            const {user, status, idFile} = req.body;
            const fileRepository = AppDataSource.getRepository(File);
            const file = await fileRepository.findOneBy({id: id});
            if(file !== null || undefined){
                // file.nom = nom;
                // file.user=user;
                
                file.status = status;
                await fileRepository.save(file);
                return res.status(201).json({message:"File updated with success!!",data: file});
            }
            else{
                return res.status(500).json({ message: 'Failed to update file, SORRY'})
            }
        }

        static async deleteFile(req:Request, res:Response){
            const {id} = req.params;
            const fileRepository = AppDataSource.getRepository(File);
            const file = await fileRepository.findOneBy({id: id});
            if(file !== null || undefined){
                await fileRepository.remove(file);
                return res.status(200).json({message:"File supprimé avec succès!!",file})
            }
            else{
                return res.status(500).json({ message: 'Failed to delete file, SORRY'})
            }
        }
        
        static async getFiles(req:Request, res:Response){
            const fileRepository = AppDataSource.getRepository(File);
            const files = await fileRepository.find()
            if(files!= null ||undefined){
                return res.status(200).json({message:"Files found with success!!",data: files})
            }
            else{
                return res.status(500).json({ message: 'Failed to get files, SORRY'})
            }
        }
        static async getFileByGuichet(req:Request, res:Response){
            const fileRepository = AppDataSource.getRepository(File);
            const idGuichet = req.params.id;
            const file = await fileRepository.find({where:{idGuichet:idGuichet}})
            if(file!= null ||undefined){
                return res.status(200).json({message:"File touvé dans ce guichet found with success!!",file})
            }
            else{
                return res.status(500).json({ message: 'Failed to get file, SORRY'})
            }

        }
      static async findFilesTickets(req:Request, res:Response){
        const fileRepository = AppDataSource.getRepository(File);
        const [count, nbr]= await fileRepository.findAndCount({
            relations:["tickets"]
        })
        .then((count)=>{
            return res.status(200).json({message:"Tickets en attente trouvées",data:count, num: nbr})
    
        })
        .catch((error)=>{
            return res.status(200).json({message:"Tickets en attente non trouvées",erreur:error})
    
        })
      }

}