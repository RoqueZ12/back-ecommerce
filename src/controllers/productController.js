import { ModelProduct } from "../models/productModel.js";

export class ProductController{
  //metodos para controlar
  //GET
  static async getAllC(req, res) {
    try {
      const resp = await ModelProduct.getAll();
      res.json(resp);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //post
  static async createC(req, res){
    try {
      const { name, description,price,stock, images } = req.body;
      const newProduct = await ModelProduct.create({ name, description,price, stock,images });
      res.json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async updateProdC(req, res) {
    try{
      
      const {_id,stock} = req.body
      const resp = await ModelProduct.updateProd({_id,stock});
      if(resp){
        res.status(200).json({message: 'STOCK updated'});
      }else{
        res.status(404).json({message: 'Product not found'});
      }
    }catch(error){  
      res.status(500).json({ error: error.message });
    }
  }
}