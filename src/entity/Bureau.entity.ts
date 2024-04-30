import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User.entity";
import { Guichet } from "./Guichet.entity";
import { Length } from "class-validator";

  @Entity({ name: "bureau" })

  export class Bureau {
    
    @PrimaryGeneratedColumn()
    @Length(1,3)
    id: number;

    @Column()
    localisation: string;
  
    @ManyToOne(()=> User, (user) => (user.bureaux))
    user: User
    
    @OneToMany((bureau_guichet) => Bureau, (bureau) => bureau.guichets)
    guichets: Guichet [];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  }

  