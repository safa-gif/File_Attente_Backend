import { Request, Response } from "express";
// import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Product } from './../entity/Product.entity';

// Get All Productx
export class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    // const data = cache.get("data");
    // if (data) {
    //   console.log("serving from cache");
    //   return res.status(200).json({
    //     data,
    //   });
    // } else {
    //   console.log("serving from db");
    //   const ProductRepository = AppDataSource.getRepository(Product);
    //   const Productx = await ProductRepository.find();
    //   cache.put("data", Productx, 10000);
    //   return res.status(200).json({
    //     data: Productx,
    //   });
    // }
    const produRepository = AppDataSource.getRepository(Product);
    const products = await produRepository.find();
    // console.log("Here result after find",users);
    
    return res.status(200).json({ message: "This are all the users", products});
  }

  // Create A New Product
  static async createProduct(req: Request, res: Response) {
    const {libProd, codeEmb, libEmb,typePrd} = req.body;
   const product = new Product();
   product.libProd= libProd;
   product.codeEmb = codeEmb;
   product.libEmb = libEmb;
   product.typePrd= typePrd;    const productRepository = AppDataSource.getRepository(Product);
    await productRepository.save(product);
    return res.status(200).json({ message: "Product has been created successfully", product});
  }

  // Update A Product
    static async updateProduct(req: Request, res: Response) {
    const { codeProd } = req.params;
    const {libProd, codeEmb, libEmb,typePrd} = req.body;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({where: { codeProd},
    });
    product.libProd= libProd;
    product.codeEmb = codeEmb;
    product.libEmb = libEmb;
    product.typePrd= typePrd;
    await productRepository.save(product);
    return res.status(200).json({ message: "Product has been  updated successfully", product });
  }


  // Delete A Product
  static async deleteProduct(req: Request, res: Response) {
    const { codeProd } = req.params;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({
      where: { codeProd },
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
      {where : {codeProd}}
    )
    .then((produit)=>{
      // console.log("Hello ",bureau)
      res.status(201).json({ message: "User found by ID ", data: produit});

    })
    
  }
}
