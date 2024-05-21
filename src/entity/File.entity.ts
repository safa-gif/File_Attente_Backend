import { Entity,PrimaryColumn, Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, JoinTable, ManyToMany } from "typeorm";

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

    // @Column()
    // nbrClientSuivant: number;

    // YYYY-MM-DD
    @Column({type: "date", name:"temps_demarrage", nullable:false})
    temps_demarrage:Date

    // YYYY-MM-DD HH:mm AM/PM
    @Column({type: 'date', name:"temps_arret", nullable:false})
    temps_arret:Date;

    
    @Column({default:0, type: "bigint" })
    numCurrent:number;

    @Column({default:0, type:"bigint"})
    ticketsRestantes:number;

    
    @UpdateDateColumn({nullable:false})
    updatedDate: Date

    @ManyToMany(()=>Ticket, (ticket)=> ticket.files)
    @JoinTable()
    tickets:Ticket[];

    
    @ManyToOne(()=> User, (user) => (user.files))
    @Column({type:"varchar", name:"user"})
    user: User

    @Column({type:"bigint", name:"guichetId"})
    guichetId: number;


    // @OneToMany((file_ticket)=> Ticket, (ticket) => ticket.file)
    // @Column({type:"varchar",name:"ticket"})
    // tickets:Ticket[];
    
    // @OneToMany((file_guichet) =>Guichet, (guichet) => guichet.file)
    // guichets: Guichet [];
     
    //histotique
    
}