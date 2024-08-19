import { Router } from "express";
import { ProductController } from "../controllers/productController.js";

export const productRoutes = Router();

productRoutes.get('/', ProductController.getAllC)
productRoutes.post('/', ProductController.createC)
productRoutes.patch('/stock', ProductController.updateProdC)