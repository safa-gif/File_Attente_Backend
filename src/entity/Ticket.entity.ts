import { Entity,PrimaryColumn, PrimaryGeneratedColumn,Column, CreateDateColumn, ManyToOne, OneToMany} from "typeorm";
// import { User } from "./User.entity";
// import { File } from "./File.entity";
import {Guichet} from "./Guichet.entity";
import { File } from "./File.entity";
import { User } from "./User.entity";



@Entity({name : "ticket"})
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    etat: boolean;

    @Column()
    NbrClientAttente: number;
  
    @CreateDateColumn()
    dateTicket: Date;
    
    @ManyToOne(()=> User, (user) => (user.tickets))
    user: User;

    @ManyToOne(()=> File, (file) => (file.tickets))
    file: File;

    @OneToMany((ticket_guichet) =>Guichet, (guichet) => guichet.ticket)
    guichets: Guichet [];

    
    
}
