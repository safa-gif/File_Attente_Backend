import { Entity,PrimaryColumn, Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, JoinTable, ManyToMany } from "typeorm";

import {User} from './User.entity';
//import { Ticket } from "./ticket.entity";
import { Guichet } from "./Guichet.entity";
import { Ticket } from "./Ticket.entity";
import { Length } from "class-validator";
@Entity({name : "file"})
export class File {

    
    @PrimaryGeneratedColumn()
    @Length(1, 3)
    id:string;

    @Column()
    nom: string;
    

    @Column({default:1})
    nbrClientSuivant: number;

    // YYYY-MM-DD
    @Column({type: "date"})
    createdDate:Date


    
    @Column({default:0, type: "bigint" })
    numCurrent:number;

    @Column({default:0, type:"bigint"})
    ticketsRestantes:number;
    
   
    @Column()
    status: "started" | "stopped";

    @OneToMany(()=> User, (user) => (user.files))
    user: User[]

    @OneToMany(()=> Ticket, (ticket) => ticket.file)
    tickets:Ticket[];
    
    @OneToMany(() =>Guichet, (guichet) => guichet.file)
    guichets: Guichet[];
     
    //histotique
    
}