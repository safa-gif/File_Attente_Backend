import {Column, CreateDateColumn,OneToOne, Entity, ManyToMany, JoinTable,ManyToOne, JoinColumn,PrimaryColumn} from "typeorm";
  import { Bureau } from "./Bureau.entity";
  import {User} from "./User.entity";
import { Guichet } from "./Guichet.entity";
  
  @Entity({ name: "produit" })
  export class Product {
    @PrimaryColumn()
    codeProd: number;
  
    @Column()
    libProd: string;
    //A supprimer
    
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(()=> User, (user) => (user.products))
    user: User
    
    @OneToOne(()=>Guichet, (guichet)=> guichet.produit)
    @JoinColumn()
    guichet: Guichet;
   
  }
  

 // typeorm migration:create ./migration/users