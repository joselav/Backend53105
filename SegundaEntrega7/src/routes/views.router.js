const express =require ("express"); 
const ProductManager= require("../controllers/ProductManager.js");
const ProductModel = require("../models/products.model.js");
const messageModel = require("../models/messages.model.js");
const CartManager = require("../controllers/CartManager.js")

const viewsRouter = express.Router();
const productData = new ProductManager();
const cartData = new CartManager();

viewsRouter.get("/products", async (req,res)=>{

    const limit =req.query.limit ||  10; 
    const page = req.query.page || 1; 
    const sort = req.query.sort || 'asc';
    const category = req.query.category || '';

    try{

        const products = await productData.getProducts(limit, page, sort, category);

        res.render("home", 
        {productos: products});
    }catch(error){
        console.log("Error al obtener productos", error);
        res.status(500).send({error: "Error interno del servidor"});
    }
    
});

viewsRouter.get("/carrito", async(req, res)=>{
    try{
        const carrito = await cartData.getCartAll();
        //console.log(carrito);
            res.render("carrito", {carrito: carrito.message})
        
    }catch(error){
        res.status(500).send({error: "Error interno del servidor"})
    }
})

viewsRouter.get("/realtimeproducts", async (req,res)=>{

    try{
        const products = await productData.getProducts();

        res.render("realTimeProducts", {productos: products});
    }catch(error){
        console.log("Error al obtener productos", error);
        res.status(500).send({error: "Error interno del servidor"});
    }
    
})

viewsRouter.get("/chat", async (req,res)=>{
    try{
        //Mostramos los mensajes
        const messages = await messageModel.find();
        //res.status(200).send(messages);
        res.render("chat", {user: messages})
    }catch(error){res.status(400).send({respuesta:"No se ha logrado conseguir los mensajes", mensaje: error})}   
}
)

viewsRouter.post("/chat", async (req,res)=>{
    const {user, message} = req.body;

    try{
        //Esperamos el nombre del usuario
        const users = await messageModel.find({user});
        if(users.length === 0){
            //Creamos el mensaje que nos acaba de enviar el usuario en nuestra DB
            const mssUser =await messageModel.create({user, messages: [{message}]})
            res.status(200).send({respuesta: 'Se ha guardado el mensaje del usuario', mensaje: mssUser})
        }else{
            //Pusheamos el mensaje
            users[0].messages.push({message})
            res.status(200).send({respuesta:"Se ha guardado exitosamente su usuario y mensaje", mensaje: users})
            await users[0].save()
        }


    }catch(error){console.error("error", error)
        res.status(400).send({respuesta:"No se ha logrado guardar los datos", mensaje: error})}
})




module.exports = viewsRouter;