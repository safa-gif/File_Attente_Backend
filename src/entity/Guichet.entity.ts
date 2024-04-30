import { Entity, PrimaryGeneratedColumn, OneToOne,
  JoinColumn, ManyToOne, 
  Column,
  OneToMany} from "typeorm";
import { User } from "./User.entity";
import { File } from "./File.entity";
import { Length } from "class-validator";
import { Product } from "./Product.entity";
import { Bureau } from "./Bureau.entity";
@Entity({ name: "guichet" })

  export class Guichet {

    // ID 
    @PrimaryGeneratedColumn()
    @Length(1, 3)
    id: number;

    // Nom Guichet
    @Column()
    nomGuichet:string;

    // OP
    @ManyToOne(()=> User, (user) => (user.guichets))
    user: User;

    @Column({name:"prodCodeGuichet",nullable : true})
    //File Assignée
    // @ManyToOne(()=> File, (file) => (file.guichets))
    // file: File;

    // Bureau  du guichet
    @Column("varchar")
    @ManyToOne(()=>Bureau,(bureau)=>(bureau.guichets))
    bureau:Bureau;
    
    // Produit De se guichet
    @OneToOne(()=>Product, (produit)=>produit.guichet)
    // @JoinColumn()
    produit:Product
    
    // @CreateDateColumn()
    // createdAt: Date;

    // @UpdateDateColumn()
    // updatedAt: Date;
  }
  