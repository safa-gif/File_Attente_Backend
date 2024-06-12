import { Entity, PrimaryGeneratedColumn, OneToOne,
  JoinColumn, ManyToOne, 
  Column,
  OneToMany} from "typeorm";
import { User } from "./User.entity";
import { File } from "./File.entity";
import { Length } from "class-validator";
import { Product } from "./Product.entity";
import { Bureau } from "./Bureau.entity";
import { Ticket } from "./Ticket.entity";
@Entity({ name: "guichet" })

  export class Guichet {

    // ID 
    @PrimaryGeneratedColumn()
    id: string;

    // Nom Guichet
    @Column()
    nomGuichet:string;

    // OP
    @ManyToOne(()=> User, (user) => (user.guichets))
    @Column({type:"varchar", nullable:true})
    user: User;

    //File Assignée
    // @ManyToOne(()=> File, (file) => (file.guichets))
    // @Column({type:"varchar",nullable:true})
    // file: File;

    // Bureau  du guichet
    @ManyToOne(()=>Bureau,(bureau)=>(bureau.guichets))
    @Column({type:"varchar", nullable:true})
    bureau:Bureau;
    
    @OneToOne(()=>Product, (produit)=>produit.guichet)
    @Column({type:"varchar",nullable : true})
    produit:Product
    
    @ManyToOne(()=>Ticket, (ticket)=>(ticket.guichets))
    @Column({type:"varchar",nullable : true})
    ticket:Ticket;

    @ManyToOne(()=>File,(file)=>(file.guichets))
    file:File;
    // @CreateDateColumn()
    // createdAt: Date;

    // @UpdateDateColumn()
    // updatedAt: Date;
  }
  