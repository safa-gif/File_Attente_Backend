import {Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "feedback" })

  export class Feedback {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({ name: "avis"})
    avis : string

    @ManyToOne(()=> User, (user) => (user.feedbacks))
    user: User
  }
  