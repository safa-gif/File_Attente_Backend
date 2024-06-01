import { Request, Response} from "express";
import { File } from "../entity/File.entity";
import { FileService } from "../services/file.service";
import { AppDataSource } from "../data-source";
export class fileController {

      // Créer une nouvelle file
     static  async createFile  (req: Request, res: Response) {
        const { nom, user } = req.body;
            const dateE = new Date();
            const file = new File();
            // while((dateE.getDay()>0 && dateE.getDay()<6)){
            // }
                file.nom = nom;
                file.nbrClientSuivant=+2;
                file.numCurrent=+1;
                file.ticketsRestantes= +1;
                file.status = "started";
                file.user=user;
                const fileRepository=  AppDataSource.getRepository(File);
                await fileRepository.save(file);
            
            if(file !== null || undefined){
                 return res.status(201).json({message:"File Créé avec succès!!",file});
            }
            else{
                return res.status(500).json({ message: 'Failed to create file, SORRY I AM NOT SORRY' });
            }
        
        };

        static async updateFile(req:Request, res:Response){
            const {id} = req.params.id;
            const {nom, user} = req.body;
            const fileRepository = AppDataSource.getRepository(File);
            const file = await fileRepository.findOneBy({id: id});
            if(file !== null || undefined){
                file.nom = nom;
                file.user=user;
                await fileRepository.save(file);
                return res.status(201).json({message:"File updated with success!!",file});
            }
            else{
                return res.status(500).json({ message: 'Failed to update file, SORRY'})
            }
        }

        static async deleteFile(req:Request, res:Response){
            const id = req.params.id;
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
        
        static async getFileByGuichet(req:Request, res:Response){

        }


}