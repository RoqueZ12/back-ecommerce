import { ModelUser } from "../models/userModels.js";
import jwt from 'jsonwebtoken'
import { SECRETKEY } from "../env/env.js";
export class UserController {
    static async getAllC(req, res) {
      try {
        const users = await ModelUser.getAll();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    static async createC(req, res){
      try {
        const { username, password } = req.body;
        const newUser = await ModelUser.create({ username, password });
        res.json(newUser);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    //delete
    static async deleteC(req, res){

      try{
        const { _id } = req.params
        const deleteUser = await ModelUser.delete(_id)
        if(deleteUser){
          res.status(200).json({message: 'User deleted'})
        } else{
          res.status(404).json({message: 'User not found'})
        }
      }catch(error){
        res.status(500).json({error: error.message})
      }
      }
      //put
      static async putC(req, res){
        const {_id} = req.params
        const {username, password} = req.body
        const useUpdate = await ModelUser.put(_id, username, password)
        if(useUpdate){
          res.status(201).json({message:"user updated"})
        }
        else {
          res.status(404).json({message:"user not found"})
        }
      }
      static async loginC(req, res) {
        const { username, password } = req.body;
        try {
          const resp = await ModelUser.login({ username, password });
          // No se recomienda usar localStorage en el backend
          //lo guardamos en un token
          const token = jwt.sign({ user: resp }, SECRETKEY, { expiresIn: '1h' });
          //configuar la cookie para almacenar el token
          res.cookie('authToken',  token, {
            httpOnly: true, // La cookie no puede ser accedida desde JavaScript en el navegador
            secure: process.env.NODE_ENV === 'production', // Solo envía la cookie a través de HTTPS en producción
            sameSite: 'None', // Permite que la cookie sea enviada con solicitudes entre sitios
            maxAge: 3600000 // La cookie expirará en 1 hora (en milisegundos)
          });
          res.status(200).json({ user: resp });
        } catch (error) {
          res.status(401).json({ error: error.message }); // Usa error.message para obtener el mensaje de error
        }
      }
      //logout
      static async logoutC(req, res){
        res.clearCookie('authToken', {
          httpOnly: true, // Asegúrate de que coincide con la configuración de la cookie cuando se estableció
          secure: process.env.NODE_ENV === 'production', // Coincide con la configuración de la cookie cuando se estableció
          sameSite: 'None' // Coincide con la configuración de la cookie cuando se estableció
        });
        res.sendStatus(200)
      }
      
}