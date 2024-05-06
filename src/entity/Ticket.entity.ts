import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, ManyToOne, OneToMany} from "typeorm";
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
    description:string;

    @Column()
    etat: string;

    @Column()
    NbrClientAttente: number;

    @Column({type: "timestamp", name:'date_ticket'})

    // @Column({type: "timestamp", name:'fin_ticket'})

    
    @ManyToOne(()=> User, (user) => (user.tickets))
    user: User;

    @ManyToOne(()=> File, (file) => (file.tickets))
    file: File;

    @CreateDateColumn()
    createTicket: Date;

    // @OneToMany((ticket_guichet) =>Guichet, (guichet) => guichet.ticket)
    // guichets: Guichet [];

    
    
}
