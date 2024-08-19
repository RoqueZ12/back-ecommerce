import { Router } from "express";
import { CartController } from "../controllers/cartController.js";
import {validToken} from '../config/validtoken.js'

export const cartRoutes = Router();

// cartRoutes.post('/', CartController.createC)
cartRoutes.post('/add', validToken,CartController.addProduct)
cartRoutes.get('/view',validToken, CartController.getCart)
cartRoutes.delete('/delete/:productId',validToken, CartController.deleteC)
cartRoutes.patch('/update/:productId',validToken, CartController.updateC)
cartRoutes.delete('/empty',validToken, CartController.emptyC)