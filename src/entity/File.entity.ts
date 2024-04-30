import { Entity,PrimaryColumn, Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import {User} from './User.entity';
//import { Ticket } from "./ticket.entity";
import { Guichet } from "./Guichet.entity";
import { Ticket } from "./Ticket.entity";
import { Length } from "class-validator";
@Entity({name : "file"})
export class File {

    // @PrimaryColumn()
    // id: string
    @PrimaryGeneratedColumn()
    @Length(1, 3)
    id:string;

    @Column()
    nom: string;

    @Column()
    nbrClientSuivant: number;

    // YYYY-MM-DD
    @Column({type: "date", name:"annee_date"})
    

    // YYYY-MM-DD HH:mm AM/PM
    @Column({type: 'timestamp', name:"full_date"})

    
    @ManyToOne(()=> User, (user) => (user.files))
    user: User

    @OneToMany((file_ticket)=> Ticket, (ticket) => ticket.file)
    tickets:Ticket[];
    
    // @OneToMany((file_guichet) =>Guichet, (guichet) => guichet.file)
    // guichets: Guichet [];
     
    //histotique
    @UpdateDateColumn()
    updatedDate: Date
}