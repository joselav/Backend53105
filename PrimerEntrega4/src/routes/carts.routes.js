import { Router } from "express"; //Importamos Router desde express.
import CartManager from "../controllers/CartManager.js"; //Llamamos al CartManager para las verifiaciones.

const cartRouter = Router(); //Definimos el cartRouter para poder llamarlo en el app.js.
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
    const cart = await cartData.getCartByID(parseInt(cid));
    
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
    //Enviamos los cid y Pid al CartManager para que los busque: 
    const prodAdd = await cartData.addProductsToCart(parseInt(cid), parseInt(pid));

    if(prodAdd.success){
        res.status(200).send(prodAdd.message);
    }else{
        res.status(400).send(prodAdd.message)
    }

 })

export default cartRouter; //exportamos cartRouter.