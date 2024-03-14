import {Column, CreateDateColumn, Entity, ManyToMany, JoinTable,ManyToOne, PrimaryColumn} from "typeorm";
  import { Bureau } from "./Bureau.entity";
  import {User} from "./User.entity";
import { Guichet } from "./Guichet.entity";
  
  @Entity({ name: "produit" })
  export class Product {
    @PrimaryColumn()
    codeProd: number;
  
    @Column()
    libProd: string;
  
    @Column({ nullable: false })
    codeEmb: string;

    @Column()
    libEmb : string;

    @Column()
    typePrd : string;
  
    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => Bureau)
    @JoinTable()
    bureaux: Bureau[]

    @ManyToOne(()=> User, (user) => (user.products))
    user: User

    @ManyToOne(()=> Guichet, (guichet) => (guichet.products))
    guichet: Guichet
  }
  
  //code emballage, nom, libellé_prod, libellé_em, type

 // typeorm migration:create ./migration/users