import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable,ManyToOne} from "typeorm";
  import { Bureau } from "./Bureau.entity";
  import {User} from "./User.entity";
  
  @Entity({ name: "produit" })
  export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ nullable: false })
    title: string;
  
    @Column({ nullable: false })
    description: string;
  
    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => Bureau)
    @JoinTable()
    bureaux: Bureau[]

    @ManyToOne(()=> User, (user) => (user.products))
    user: User
  }
  