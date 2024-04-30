import { Entity,PrimaryColumn, OneToMany, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import {IsEmail, Length} from "class-validator";
import {Product } from "./Product.entity";
import {Guichet} from "./Guichet.entity";
import {Bureau } from "./Bureau.entity";
import {Feedback} from "./Feedback.entity";
import { File } from "./File.entity";
import { Ticket } from "./Ticket.entity";
// import { Ticket
//  } from "./ticket.entity";
export type roleType = "admin" | "client" | "operateur";


@Entity({name : "user"})
export class User {

    @PrimaryColumn()
    id: string

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Length(8)
    telephone : number

    @Column({ nullable: false })
    password: string;
  
    @Column()
    role: string ;
    
    @OneToMany((user_product) => Product, (product) => product.user)
    products: Product [];
    
    @OneToMany((user_guichet) =>Guichet, (guichet) => guichet.user)
    guichets: Guichet [];
    
    @OneToMany((user_bureau) =>Bureau, (bureau) => bureau.user)
    bureaux: Bureau [];

    @OneToMany((user_feedback) =>Feedback, (feedback) => feedback.user)
    feedbacks: Feedback [];

    @OneToMany((user_ticket)=> Ticket, (ticket) => ticket.user)
    tickets:Ticket[];

    @OneToMany((user_file)=> File, (file)=> file.user)
    files:File[];

    @CreateDateColumn()
    createdAt: Date;

}
