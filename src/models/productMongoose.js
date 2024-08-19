import mongoose from "mongoose";

//Definiendo el objeto a validar
 const productSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  description :{
    type: String,
    required: true
  },
  price :{
    type: Number,
    required: true
  },
  stock :{
    type: Number,
    required: true
  },
  images:[String]
},


{timestamps: true})
//crea 2 campos el created y updated

// Métodos

//Para consultas, crea coleccion Users, interactua con la base de datos
export const ProductModel = mongoose.model('Products', productSchema)