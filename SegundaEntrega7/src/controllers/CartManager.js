const CartModel = require("../models/carts.model.js");
const ProductModel = require("../models/products.model.js")
const mongoose = require('mongoose');


class CartManager{

    //Función para mostrar todo lo que hay en los carritos
    async getCartAll(){
        const cartShow = await CartModel.find();

        return{success: true, message: cartShow}
    }

    //El getCartByID deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
    async getCartByID(id){
        //Utilicé la misma lógica que el ProductManager. 

        const cartID = await CartModel.findById(id);

        //Si o se encuentra, se manda el mensaje.
        if(!cartID){
            return {success: false, message:'NOT FOUND. No hay producto existente con ese número de ID.'}
        }

        //Si se encuentra, se mande el mensaje y el array del carrito que se buscó.
        return {success:true, message: `Se ha encontrado el producto con id ${cartID.id}: ${cartID}`};
    };



// addCart --> deberá crear un nuevo carrito con la siguiente estructura:
// Id:Number/String (autoincrementable);  // products: Array que contendrá objetos que representen cada producto
    async addCart(){
      try{
        //especificamos la estructura: 
        const newCart = new CartModel({product: []});

        await newCart.save();
        return {success: true, message: `Carrito con id ${newCart.id} creado exitosamente en el carrito`};


    }catch(error){
        return {success: false, message: `No se ha logrado crear el carrito`};
    }
    };


    //La función addProductsToCart deberá agregar el producto al arreglo “products” del carrito seleccionado.
    //cid ---> id del carrito 
    //pid ---> id del producto
    async addProductsToCart(cid, pid, quantity) {
        try {
            // Buscamos el carrito por su ID
            const cart = await CartModel.findById(cid);
            
            // Buscamos el índice del producto en el carrito
            const prodIndex = cart.products.findIndex(prod => prod.id_prod.equals(pid));
            
            if (prodIndex !== -1) {
                // Si el producto ya está en el carrito, sumamos la cantidad
                cart.products[prodIndex].quantity = quantity;
            } else {
                // Si el producto no está en el carrito, lo añadimos al arreglo de productos
                cart.products.push({ id_prod: pid, quantity: quantity });
            }
    
            console.log(cart.products);
    
            // Marcamos el carrito como modificado
            cart.markModified("products");
            
            // Guardamos los cambios en la base de datos
            await cart.save();
    
            return { success: true, message: `El producto con id ${pid} se ha agregado correctamente.` };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'No se ha podido agregar el producto al carrito.' };
        }
    }
    

    async deleteProductsInCart(cid,pid){

        //$pull se utiliza para eliminar elementos de un array que cumplan ciertos criterios.
        //En este caso, se utiliza en combinación con findOneAndUpdate para eliminar un producto específico del array de productos dentro de un documento de carrito.
        const deleteProd = await CartModel.findOneAndUpdate({_id:cid},
                                                             {$pull:{products:{ "id_prod":pid}}},
                                                             {new: true});

        if(!deleteProd){
            return {success: false, message: `Producto no encontrado o inexistente.`}
        }

        return {success: true, message: 'Producto eliminado exitosamente', deletedProd: deleteProd};
    }
    
    async deleteCart(cid){
        const deleteC = await CartModel.findByIdAndDelete(cid);


        if(!deleteC){
            return {success: false, message: `Producto con id ${deleteC.id} no encontrado o inexistente.`}
        }

        return {success: true, message: 'Producto eliminado exitosamente', deletedCart: deleteC};
    }

    async updateCart(cid, id_prod, quantity){
        const cart = await CartModel.findById(cid);
    
        if(!cart){
          return {success:false, message: 'Carrito no encontrado'};
        }
    
        const ppid = new mongoose.Types.ObjectId(id_prod)
        
        const prodIndex = cart.products.findIndex((prod)=> prod.id_prod.equals(ppid));
    
        if(prodIndex == -1){return {success: false, message: 'Producto no encontrado'};}
    
        cart.products[prodIndex].quantity = quantity;
    
        await cart.save();
        return {success: true, message: `Carrito actualizado con éxito ${cart}`}
        
    }

    async updateProdInCart(cid, pid, quantity) {
        try {
            const cart = await CartModel.findById(cid);

            if (!cart) {
                return { success: false, message: 'Carrito no encontrado' };
            }

            const ppid = new mongoose.Types.ObjectId(pid);
    
            const productIndex = cart.products.findIndex(prod => prod.id_prod.equals(ppid));
            if (productIndex === -1) {
                return { success: false, message: 'Producto no encontrado en el carrito' };
            }
    
            
            cart.products[productIndex].quantity = quantity;
    
            await cart.save();
    
            return { success: true, message: 'Cantidad del producto actualizada correctamente' };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Error al actualizar el producto en el carrito' };
        }
    }

}

//export default CartManager;

//versión sin importación ("type": "module"):
module.exports = CartManager;