import {Column, CreateDateColumn,OneToOne, Entity, ManyToOne, JoinColumn,PrimaryColumn} from "typeorm";
import {User} from "./User.entity";
import { Guichet } from "./Guichet.entity";
import { Length } from "class-validator";
  
  @Entity({ name: "produit" })
  export class Product {

    @PrimaryColumn()
    // @Length(1, 99999)
    codeProd: string;
  
    @Column()
    libProd: string;

    @Column()
    quantite:number

    @ManyToOne(()=> User, (user) => (user.products))
    user: User
    @Column({type:"varchar",nullable:true})
    @OneToOne(()=>Guichet, (guichet)=> guichet.produit)
    // @JoinColumn()
    guichet: Guichet;

    @CreateDateColumn()
    createdAt: Date;
   
  }
  

 // typeorm migration:create ./migration/users