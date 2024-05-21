import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, ManyToOne, OneToMany, UpdateDateColumn, ManyToMany, JoinTable} from "typeorm";
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

    @Column({nullable:false})
    etat: string;

    @Column({nullable:false})
    priorite:number;

    @CreateDateColumn()
    createTicket: Date;

    @UpdateDateColumn()
    updatedAt:Date;
    @Column({type:'date', name:"date"})
    date:Date;


    @ManyToMany(()=>File, (file)=> file.tickets)
    @JoinTable()
    files:File[];

    @Column()
    NbrClientAttente: number;

    // @Column({type: "datetime", name:'date_ticket'})

    
    @ManyToOne(()=> User, (user) => (user.tickets))
    user: User;

    // @ManyToOne(()=> File, (file) => (file.tickets))
    // @Column({type:"varchar", name:"file"})
    // file: File;

   

    // @OneToMany((ticket_guichet) =>Guichet, (guichet) => guichet.ticket)
    // guichets: Guichet [];

    
    
}
