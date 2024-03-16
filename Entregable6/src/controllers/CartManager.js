const CartModel = require("../models/carts.model.js");



class CartManager{

    //Función para mostrar todo lo que hay en los carritos
    async getCartAll(){
        const cartShow = await CartModel.find();

        return{success: true, message: cartShow || []}
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
    async addProductsToCart(cid, pid){
       try{ //Buscamos que el cid ingresado coincida con uno dentro del archivo:  
        const cart = await CartModel.findById(cid);
        const prodExist= cart.products.find((prod)=> prod.product.toString() === pid);
            
            //Verificamos que se haya encontrado el pid deseado en el carrito para sumar la cantidad:
            if(prodExist){
                prodExist.quantity+= quantity;
            }else{
                cart.product.push({product: pid, quantity:1});
            }  

            // Al modificar un archivo, se debe marcar por lo que utilizamos "markModified"
            cart.markModified("product");
            await cart.save()
            return {success:true, message: `El producto con id ${pid} se ha agregado correctamente.`}
        }catch{
            //Enviamos un mensaje de que no se pudo crear el carrito:
            return {success: false, message: 'No se ha podido crear el producto'}
        }
    }

}

//export default CartManager;

//versión sin importación ("type": "module"):
module.exports = CartManager;