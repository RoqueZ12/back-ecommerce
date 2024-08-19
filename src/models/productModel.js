import { ProductModel } from "./productMongoose.js";

export class ModelProduct {
  //metodos 
  //GET
  static async getAll(){
    const products = await ProductModel.find()
    return products
  }
  //post
  static async create({ name, description, price,stock, images }) {
    try{
      const newProduct = new ProductModel({ name, description, price, stock,images });
      await newProduct.save();
    return newProduct;
    }catch(error){
      console.log(error)
    }
  }
  //patch
  static async updateProd({_id, stock}){
    try{
      const product = await ProductModel.findById({_id});
      product.stock = stock;
      await product.save();
      return product
    }catch(error){
      console.log(error)
    }
  }
}