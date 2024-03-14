import { Entity,PrimaryColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";

import {User} from './User.entity';
//import { Ticket } from "./ticket.entity";
import { Guichet } from "./Guichet.entity";
import { Ticket } from "./Ticket.entity";
@Entity({name : "file"})
export class File {

    @PrimaryColumn()
    id: string

    @Column()
    nom: string;

    @Column()
    nbrClientSuivant: number;
    
    @ManyToOne(()=> User, (user) => (user.files))
    user: User

    @OneToMany((file_ticket)=> Ticket, (ticket) => ticket.file)
    tickets:Ticket[];
    
    @OneToMany((file_guichet) =>Guichet, (guichet) => guichet.file)
    guichets: Guichet [];
  

}