import { ModelCart } from "../models/cartModel.js";
import { CartModel } from "../models/cartMongoose.js";
export class CartController {
  // static async createC(req,res){
  //   try{
  //     const {products} = req.body
  //     const newCart = await ModelCart.create({products})
  //     res.json(newCart)
  //   }catch(error){
  //     res.status(500).json({error: error.message})
  //   }
  // }
  static async getCart(req, res) {
    try {
      const userId = req.user._id; // Obtener ID del usuario desde el token o sesión
      const cart = await CartModel.findOne({ user: userId }).populate('products.product');
      res.status(200).json({ cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static async deleteC(req, res) {
    try {
      const userId = req.user._id;
      const { productId } = req.params;
      const result = await ModelCart.delete({ userId, productId });

      if (!result.success) {
        return res.status(404).json({ message: result.message });
      }
      res.status(200).json({ message: 'Product deleted', cart: result.cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async addProduct(req, res) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user?._id; 
      const cart = await ModelCart.addProductToCart({userId, productId, quantity});
      res.status(200).json({ cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async updateC(req, res) {
    try{
      const userId= req.user._id;
      const { productId, quantity } = req.body;
      const result = await ModelCart.updateQuantity({ userId, productId, quantity });
      if (!result.success) {
        return res.status(404).json({ message: result.message });
      }
      res.status(200).json({ cart: result.cart });
    }catch(error){}
  }
  static async emptyC(req, res) {
    try{
      const userId= req.user._id;
      const resp = await ModelCart.emptyCart({ userId });
      if (!resp) {
        return res.status(404).json({ message: "CARRITO NO VACIADO, ERROR" });
      } else{
        res.status(200).json({ message: 'Carrito vaciado' });
      }
    }catch(error){
      res.status(500).json({ error: error.message });
    }
  }
}