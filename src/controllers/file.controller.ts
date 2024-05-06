import { Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { File } from "../entity/File.entity";
import { Ticket } from "../entity/Ticket.entity";

export class fileController {

    // get Files
    static async peek(req: Request, res: Response): Promise<any>{

    }

    static async enQueue(req: Request, res: Response): Promise<any>{

    }

    static async deQueue(req: Request, res: Response): Promise<any>{
        
    }
    
    static async isEmpty(req: Request, res: Response): Promise<any>  {
        
    }

    static async clear(req: Request, res: Response){

    }

    // static async suppimerFile(req: Request, res: Response): Promise<any>{
        
    // }

    // static async ajouterTicketFile(req: Request, res: Response): Promise<any>{
        
    // }

    // static async suppimerTicketFile(req: Request, res: Response): Promise<any>{
        
    // }

    

}