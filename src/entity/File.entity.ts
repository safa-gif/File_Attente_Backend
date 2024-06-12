import { Entity, Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    // @Column({default:1})
    // nbrClientSuivant: number;

    // YYYY-MM-DD
    @CreateDateColumn()
    fileDate:Date;
    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    //fileDate:Date
    // Use Time type for time 
    //  @Column({ type: 'time', default: () => 'CURRENT_TIME' })
    //  timeOnly: string;
    //  // Use date type for date 
    //  @Column({ type: 'date' , default: () => 'CURRENT_DATE'})
    //  dateOnly: string;
    //  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    // timestampField: Date;

    @Column()
    idGuichet:string;
    // @Column({default:0, type: "bigint" })
    // numCurrent:number;

    // @Column({default:0, type:"bigint"})
    // ticketsRestantes:number;
    
   
    @Column({type: 'enum', enum: ['demarrer', 'arreter'], default: 'arreter' })
    status: "demarrer" | "arreter";

    // @OneToMany(()=> User, user => user.files)
    // user: User[]

    @OneToMany(()=> Ticket, ticket => ticket.file
    , {cascade: true, eager:true}
)
    tickets:Ticket[];
    
    // @OneToMany(() =>Guichet, (guichet) => guichet.file)
    // guichets: Guichet[];
     @OneToMany(()=>User, user=>user.file)
     users:User[];

     @OneToMany(()=>Guichet, guichet=>guichet.file)
     guichets:Guichet[];
    //histotique
    
}