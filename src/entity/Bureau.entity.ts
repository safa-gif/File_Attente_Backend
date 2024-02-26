import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { User } from "./User.entity";
  
  @Entity({ name: "bureau" })

  export class Bureau {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    localisation: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @ManyToOne(()=> User, (user) => (user.bureaux))
    user: User

  }

  