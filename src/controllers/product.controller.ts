import { Request, Response } from "express";
// import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Product } from './../entity/Product.entity';

// Get All Productx
export class ProductController {
  static async getAllProducts(req: Request, res: Response) {

    const produRepository = AppDataSource.getRepository(Product);
    const products = await produRepository.find();
    // console.log("Here result after find",users);
    
    return res.status(200).json({ message: "This are all the users", 
    products});
  }

  // Create A New Product
  static async createProduct(req: Request, res: Response) {
    const {codeProd, libProd, user, guichet} = req.body;
   const product = new Product();
   product.codeProd = codeProd;
   product.libProd= libProd;
   product.user = user;
   product.guichet = guichet;
    const productRepository = AppDataSource.getRepository(Product);

    // const prodtExistant = await productRepository.find({
    //   where:  {codeProd : codeProd} 
    // })
    // if(prodtExistant!=null){
    //   return res.status(500).json({
    //     message: 
    //     "Produit Existant Déjà ou Problème c'est survenue lors de la création du guichet"
    //   })
    // }
    await productRepository.save(product);
    return res.status(200).json({ message: "Product has been created successfully",
     product});
  }

  // Update A Product
    static async updateProduct(req: Request, res: Response) {
    const { codeProd } = req.params;
    const {libProd, user, guichet} = req.body;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({where: { codeProd},
    });
    product.libProd= libProd;
    product.user = user;
    product.guichet = guichet;
  
    await productRepository.save(product);
    return res.status(200).json({ message: "Product has been  updated successfully", product });
  }


  // Delete A Product
  static async deleteProduct(req: Request, res: Response) {
    const { codeProd } = req.params;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({
      where: { codeProd : codeProd},
    });
    await productRepository.remove(product);
    return res.status(200).json({ message: "Product deleted successfully", product});
  }

  // Statistics
  static async totalProduct(req: Request, res: Response) {
    const productRepository = AppDataSource.getRepository(Product);
    const nbr = await productRepository.count();
    if( nbr > 0 ) {
        return res.status(200).json({message : "Nombre des Produits  dans la base de données " , nbr})
    }
    else {
        return res.json({message : "Table est vide"})
    }
  }

  //Get Product By Id
  static async getProductById(req:Request ,res :Response){
    const {codeProd} = req.params ;
    const productRepository=AppDataSource.getRepository(Product);
    const produit = await productRepository.findOne(
      {where : {codeProd: codeProd},
    }
    )
    .then((produit)=>{
      // console.log("Hello ",bureau)
      res.status(200).json({ message: "User found by ID ", data: produit});

    })
    .catch((err)=> {
      res.status(500).json({ message : " Could not find the product with this ID ", error: err})

    })
  }
  // GetProductByGuichet

  // GetProductByUserI

  
}
