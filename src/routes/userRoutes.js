import { Router } from "express";
import { UserController } from "../controllers/userController.js";
export const userRoutes = Router();
export const userRoutesL = Router()

userRoutes.post('/', UserController.createC)
userRoutes.get('/', UserController.getAllC)
userRoutes.delete('/:_id', UserController.deleteC)
userRoutes.put('/:_id', UserController.putC)
//login
userRoutesL.post('/login', UserController.loginC)
userRoutesL.post('/logout', UserController.logoutC)