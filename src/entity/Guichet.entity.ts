import {Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "guichet" })

  export class Guichet {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(()=> User, (user) => (user.guichets))
    user: User
  }
  