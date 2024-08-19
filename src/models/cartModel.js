import { CartModel } from "./cartMongoose.js";
import { ProductModel } from "./productMongoose.js";
export class ModelCart{

  static async delete({ userId, productId }) {
    try {
      // Buscar el carrito por ID
      const cart = await CartModel.findOne({ user: userId });

      if (!cart) {
        return { success: false, message: 'Carrito no encontrado' };
      }
  
      // Encuentra y elimina el producto
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
  
      if (productIndex === -1) {
        return { success: false, message: 'Producto no encontrado en el carrito' }
      }
  
      cart.products.splice(productIndex, 1);
      await cart.save();

      return { success: true, cart };
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      return { success: false, message: 'Error interno del servidor' };
    }
  }
  static async addProductToCart({ userId, productId, quantity }) {
    try {
        let cart = await CartModel.findOne({ user: userId });

        if (cart) {
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex > -1) {
                // Verifica que la cantidad no baje de 1
                if (cart.products[productIndex].quantity + quantity <= 0) {
                    cart.products.splice(productIndex, 1); // Elimina el producto si la cantidad es 0 o menor
                } else {
                    cart.products[productIndex].quantity += quantity;
                }
            } else {
                if (quantity > 0) {
                    cart.products.push({ product: productId, quantity });
                }
            }
            await cart.save();
        } else {
            if (quantity > 0) {
                cart = new CartModel({
                    user: userId,
                    products: [{ product: productId, quantity }]
                });
                await cart.save();
            }
        }
        return cart;
    } catch (error) {
        console.error(error);
        throw new Error('Error al agregar producto al carrito');
    }
}

  static async updateQuantity({ userId, productId, quantity }) {
    try{
      const updateCart = await CartModel.findOneAndUpdate(
        { user: userId, 'products.product': productId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
      );
      return { success: true, cart: updateCart }; // Deberías devolver una estructura consistente
    }catch(error){ 

    }   
  }
  static async emptyCart({userId}){
    try{
      const cart = await CartModel.findOne({user: userId})
       // Reducir el stock de cada producto en el carrito
       for (const item of cart.products) {
        const product = await ProductModel.findById(item.product);
        if (product) {
          // Reduce el stock del producto
          product.stock -= item.quantity;
          await product.save();
        }
      }

      // Vaciar el carrito
      cart.products = [];
      await cart.save();

      return { success: true, cart };
    }catch(error){
      console.log(error)
    }
  }
  
}