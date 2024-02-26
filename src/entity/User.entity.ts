import { Entity, PrimaryGeneratedColumn, OneToMany, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import {IsEmail, Length} from "class-validator";
import {Product } from "./Product.entity";
import {Guichet} from "./Guichet.entity";
import {Bureau } from "./Bureau.entity";
import {Feedback} from "./Feedback.entity";
export type roleType = "admin" | "client" | "operateur";


@Entity({name : "user"})
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    fullName: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Length(8)
    telephone : number

    @Column({ nullable: false })
    password: string;
  
    @Column({ default: 'client'})
    role: string ;
  
    @CreateDateColumn()
    createdAt: Date;
    
    @OneToMany((user_product) => Product, (product) => product.user)
    products: Product [];
    
    @OneToMany((user_guichet) =>Guichet, (guichet) => guichet.user)
    guichets: Guichet [];
    
    @OneToMany((user_bureau) =>Bureau, (bureau) => bureau.user)
    bureaux: Bureau [];

    @OneToMany((user_feedback) =>Feedback, (feedback) => feedback.user)
    feedbacks: Feedback [];
}
