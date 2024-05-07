import * as express from "express";
import { ProductController } from "../controllers/product.controller";
const Router = express.Router();

//getting all products
Router.get("/products",ProductController.getAllProducts);



// creating a new product
Router.post("/create-product", ProductController.createProduct);

//Updating product
Router.put("/update-product/:id",ProductController.updateProduct);

// Delete product
Router.delete("/delete-product/:id",ProductController.deleteProduct);

// Find product by Id
Router.get("/find-product/:id",ProductController.getProductById);

// Count all products
Router.get("/count", ProductController.totalProduct);



export { Router as productRouter };
