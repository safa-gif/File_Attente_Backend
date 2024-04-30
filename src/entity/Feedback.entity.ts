import {Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "feedback" })

  export class Feedback {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column({ name: "avis"})
    avis : string

    @ManyToOne(()=> User, (user) => (user.feedbacks))
    user: User

    // @Column({type: 'date', name:"dateCreation"})
    // dateCreation:Date ;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  }
  