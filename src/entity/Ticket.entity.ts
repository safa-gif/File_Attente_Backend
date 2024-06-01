import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, ManyToOne, OneToMany, UpdateDateColumn, ManyToMany, JoinTable, Generated} from "typeorm";
// import { User } from "./User.entity";
// import { File } from "./File.entity";
import {Guichet} from "./Guichet.entity";
import { File } from "./File.entity";
import { User } from "./User.entity";



@Entity({name : "ticket"})
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    description:string;

    @Column({type: 'enum', enum: ['en attente', 'en cours', 'traité', 'terminé'], default: 'en attente' })
    status: 'en attente' | 'en cours' | 'traité' | 'terminé';
  
    @Column()
    // @Generated("increment")
    NbrClientAttente: number;

    @CreateDateColumn()
    dateTicket: Date;
    
    @Column()
    codeProd:number;

    @Column()
    codeClient:string;
    
    @Column()
    idGuichet:string
   

    @ManyToOne(()=> User, (user) => (user.tickets))
    user: User;

    @ManyToOne(()=>File,(file)=>(file.tickets))
    file:File;

    @OneToMany((ticket_guichet) =>Guichet, (guichet) => guichet.ticket)
    guichets: Guichet [];
     @UpdateDateColumn()
    updatedAt:Date;

    
    
}
