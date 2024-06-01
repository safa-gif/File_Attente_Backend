import { AppDataSource } from "../data-source";
import { Ticket } from '../entity/Ticket.entity';
import { File } from "../entity/File.entity";
import { User } from '../entity/User.entity';

export class FileService {
    // static getQueueByCounterId(arg0: number) {
    //     throw new Error("Method not implemented.");
    // }
    // static getQueues() {
    //     throw new Error("Method not implemented.");
    // }
    // static stopQueue(arg0: number) {
    //     throw new Error("Method not implemented.");
    // }
    // static startQueue(arg0: number) {
    //     throw new Error("Method not implemented.");
    // }
    // static createQueue(name: any, operatorId: any) {
    //     throw new Error("Method not implemented.");
    // }
    
    static queueRepository = AppDataSource.getRepository(File);

    static async createQueue(name: string, operatorId: number) {
        const queue = new File();
        queue.nom = name;
        queue.user = { id: operatorId } as any;
        queue.status = "stopped";
        return await this.queueRepository.save(queue);
    }

    static async startQueue(queueId: string) {
        const queue = await this.queueRepository.findOne(
            { where:{
                id: queueId 
            }
            }
        );
        if (queue) {
            queue.status = "started";
            return await this.queueRepository.save(queue);
        }
    }

    static async stopQueue(queueId: string) {
        const queue = await this.queueRepository.findOne({ where:{id: queueId} });
        if (queue) {
            queue.status = "stopped";
            return await this.queueRepository.save(queue);
        }
    }

    static async getQueues() {
        return await this.queueRepository.find({ relations: ["user"] });
    }

    static async getQueueByCounterId(counterId: string) {
        return await this.queueRepository.findOne({ where: { id: counterId }, relations: ["user"] });
    }
}