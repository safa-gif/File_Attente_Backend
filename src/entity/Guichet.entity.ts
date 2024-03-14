import {Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User.entity";
import { File } from "./File.entity";
import { Length } from "class-validator";
import { Product } from "./Product.entity";
import { Ticket } from "./Ticket.entity";
@Entity({ name: "guichet" })

  export class Guichet {

    @PrimaryGeneratedColumn()
    @Length(1, 6)
    id: number;

    @ManyToOne(()=> User, (user) => (user.guichets))
    user: User;

    @ManyToOne(()=> File, (file) => (file.guichets))
    file: File;
    
    @ManyToOne(()=> Ticket, (ticket) => (ticket.guichets))
    ticket:Ticket;

    @OneToMany((guichet_product) =>Product, (product) => product.guichet)
    products: Product [];

    
  }
  