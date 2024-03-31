import { Entity, PrimaryGeneratedColumn, OneToOne,
  JoinColumn, ManyToOne, 
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany} from "typeorm";
import { User } from "./User.entity";
import { File } from "./File.entity";
import { Length } from "class-validator";
import { Product } from "./Product.entity";
import { Bureau } from "./Bureau.entity";
@Entity({ name: "guichet" })

  export class Guichet {

    @PrimaryGeneratedColumn()
    @Length(1, 3)
    id: number;
    
    @ManyToOne(()=> User, (user) => (user.guichets))
    user: User;

    @ManyToOne(()=> File, (file) => (file.guichets))
    file: File;
    
    @ManyToOne(()=>Bureau,(bureau)=>(bureau.guichets))
    bureau:Bureau;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateddAt: Date;
    
    @OneToOne(()=>Product, (produit)=>produit.guichet)
    @JoinColumn()
    produit:Product
  }
  