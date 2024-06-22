const CartServices = require("../services/cart.services.js");

const cartData = new CartServices();

class CartController{
    async getCarts(req,res){
        const cart = await cartData.getCartAll();

        if(cart){
            res.status(200).send(cart);
        }else{
            res.status(400).send("Ha ocurrido un error");
        }
    }

    async getCID(req, res){
        //Tomamos el Cid desde req.params:
        const {cid} = req.params;
        //Esperamos la información del CartManager:
        const cart = await cartData.getCartByID(cid);
        
        if(cart.success){
            res.status(200).send(cart.message);
        }else{
            res.status(400).send(cart.message);
        }
    }

    async addC(req,res){
         //Este es fácil, solo esperamos al CartManager y mostramos los mensajes.
        const cart = await cartData.addCart();

        if(cart){
            res.status(200).send(cart.message)
        }else{
            res.status(400).send(cart.message)
        }
    }


    async addCPID(req, res){
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

    }

    async updateC(req,res){
         //Pedimos el cid como parámetro
        const {cid} = req.params;
        //Pedimos el id_prod y la cantidad como información desde el cuerpo
        const {id_prod, quantity} = req.body;

        //Enviamos los datos recibidos al cartManeger
        const cartUpdate = await cartData.updateCart(cid, id_prod, quantity);

        //Controlamos los errores y enviamos mensaje
        if(cartUpdate.success){
            res.status(200).send(cartUpdate.message)
        }else{
            res.status(400).send(cartUpdate.message)
        }
    }

    async updateCPID(req, res){
         //Pedimos el cid y pid como parametros
        const {cid, pid} = req.params; 
        //Pedimos la cantidad desde el body
        const {quantity} = req.body;

        //Enviamos la información al cartManager
        const prodUpdate = await cartData.updateProdInCart(cid, pid, quantity);

        //Mostramos los mensajes
        if(prodUpdate.success){
            res.status(200).send(prodUpdate.message)
        }else{
            res.status(400).send(prodUpdate.message)
        }
    }

    async deleteC (req,res){
         //Pedimos el cid como parámetro
        const {cid} = req.params;
        //Enviamos la información al cartManager
        const deleteCart = await cartData.deleteCart(cid);

        //Mostramos los mensajes correspondientes
        if(deleteCart.success){
            res.status(200).send(deleteCart.message);
        }else{
            res.status(400).send(deleteCart.message);
        }
    }

    async deleteCPID(req,res){
        //Pedimos el cid y pid como parámetros
        const {cid, pid} = req.params;
        
        //Los enviamos al cartManager para controlar errores
        const deleteProdCart = await cartData.deleteProductsInCart(cid,pid);

        //Mostramos los mensajes correspondientes
        if(deleteProdCart.success){
            res.status(200).send(deleteProdCart.message)
        }else{
            res.status(400).send(deleteProdCart.message)
        }
    }


}

module.exports = CartController;