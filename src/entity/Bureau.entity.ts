import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User.entity";
import { Guichet } from "./Guichet.entity";
  
  @Entity({ name: "bureau" })

  export class Bureau {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    localisation: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @ManyToOne(()=> User, (user) => (user.bureaux))
    user: User
    
    @OneToMany((product_guichet) => Bureau, (bureau) => bureau.guichets)
    guichets: Guichet [];
  }

  