//import { Router } from "express"; //Importamos Router desde express.
//import CartManager from "../controllers/CartManager.js"; //Llamamos al CartManager para las verifiaciones.

//versión sin importación ("type": "module"):
const express = require("express");
const CartManager = require("../controllers/CartManager.js");

const cartRouter = express.Router(); //Definimos el cartRouter para poder llamarlo en el app.js.
const cartData = new CartManager(); //Definimos el CartManajer en una constante para no repetir 'new CartManager()' todo el tiempo.

//Definimos las rutas:

//Esta ruta no se pide, pero es para controlar que funcione: 
cartRouter.get('/', async (req, res) =>{
    const cart = await cartData.getCartAll();

    if(cart){
        res.status(200).send(cart);
    }else{
        res.status(400).send("Ha ocurrido un error");
    }
})

//La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
cartRouter.get('/:cid', async (req, res)=>{
    //Tomamos el Cid desde req.params:
    const {cid} = req.params;
    //Esperamos la información del CartManager:
    const cart = await cartData.getCartByID(cid);
    
    if(cart.success){
        res.status(200).send(cart.message);
    }else{
        res.status(400).send(cart.message);
    }
});


//La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
// Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
// products: Array que contendrá objetos que representen cada producto

cartRouter.post('/', async (req, res)=>{
    //Este es fácil, solo esperamos al CartManager y mostramos los mensajes.
    const cart = await cartData.addCart();

    if(cart){
        res.status(200).send(cart.message)
    }else{
        res.status(400).send(cart.message)
    }

});


//La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado,
 cartRouter.post('/:cid/product/:pid', async (req, res)=>{
    //Pedimos los parametros cid y pid:
    const {cid, pid} = req.params;
    const {quantity} = req.body 
    //Enviamos los cid y Pid al CartManager para que los busque: 
    const prodAdd = await cartData.addProductsToCart(cid, pid, quantity);

    if(prodAdd.success){
        res.status(200).send(prodAdd.message);
    }else{
        res.status(400).send(prodAdd.message)
    }

 })

//La ruta Put /:cid/product/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
cartRouter.put('/:cid/product/:pid', async (req, res)=>{
    const {cid, pid} = req.params; 
    const {quantity} = req.body;

    const prodUpdate = await cartData.updateProdInCart(cid, pid, quantity);

    if(prodUpdate.success){
        res.status(200).send(prodUpdate.message)
    }else{
        res.status(400).send(prodUpdate.message)
    }
})


//La ruta PUT /:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba:
cartRouter.put('/:cid', async(req, res)=>{
    const {cid} = req.params;
    const {id_prod, quantity} = req.body;

    const cartUpdate = await cartData.updateCart(cid, id_prod, quantity);

    if(cartUpdate.success){
        res.status(200).send(cartUpdate.message)
    }else{
        res.status(400).send(cartUpdate.message)
    }
})


//La ruta DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
cartRouter.delete('/:cid/product/:pid', async(req, res)=>{
    const {cid, pid} = req.params;
    
    const deleteProdCart = await cartData.deleteProductsInCart(cid,pid);

    if(deleteProdCart.success){
        res.status(200).send(deleteProdCart.message)
    }else{
        res.status(400).send(deleteProdCart.message)
    }
})

//La ruta DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
cartRouter.delete('/:cid', async(req, res)=>{
    const {cid} = req.params;
    const deleteCart = await cartData.deleteCart(cid);

    if(deleteCart.success){
        res.status(200).send(deleteCart.message);
    }else{
        res.status(400).send(deleteCart.message);
    }

})




//export default cartRouter; //exportamos cartRouter.

//versión sin importación ("type": "module"):
module.exports = cartRouter;