
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
//Definiendo el objeto a validar
 const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  password :{
    type: String,
    required: true
  }
},


{timestamps: true})
//crea 2 campos el created y updated

// Método de instancia para comparar contraseñas
userSchema.methods.compararPassword =  function (password) {
  return bcrypt.compareSync(password, this.password)
}
//Para consultas, crea coleccion Users, interactua con la base de datos
export const UserModel = mongoose.model('Users', userSchema)