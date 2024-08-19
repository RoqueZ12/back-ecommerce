import { UserModel } from "./modelMongoose.js";
import bcrypt from 'bcryptjs'

 export class ModelUser{
  //los metodos
  //get
  static async getAll(){
    const user = await UserModel.find()
    return user
  }
  //post: registrar user
  static async create({username, password}){
    try{
      //hash password
      const passHash = await bcrypt.hash(password, 10)
      //verificar si existe mismo usuario
      const existUser = await UserModel.findOne({username})
      if(existUser) throw new Error('El usuario ya existe')
      //creamos nuevo user
      const newUser = new UserModel({username, password:passHash})
      await  newUser.save()
      console.log(newUser)
      return newUser
    }catch(error){  
      console.log(error)
    }
    
  }
  //delete
  static async delete (_id){
    try{
      //buscamos el user por ID
      const user = await UserModel.findByIdAndDelete(_id)
      return user
    }catch(error){
      console.log(error)
    }
  }
  //put
  static async put(_id){
    try{
      //buscamos el user por ID
      const user = await UserModel.findByIdAndUpdate(_id)
      return user
    }catch(error){
      console.log(error)
    }
  }
  //login
  static async login({ username, password }) {
    try {
      const resp = await UserModel.findOne({ username });
      if (!resp) throw new Error('Usuario no encontrado');
  
      const pass = await resp.compararPassword(password);
      if (!pass) throw new Error('Contraseña incorrecta');
  
      return resp;
    } catch (e) {
      throw new Error(`Error al iniciar sesión: ${e.message}`);
    }
  }
  //logout no necesita logica, vmaos al controller
    
}