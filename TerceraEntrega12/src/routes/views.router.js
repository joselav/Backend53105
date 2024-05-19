const express =require ("express"); 
const ProductManager= require("../controllers/ProductManager.js");
const CartModel = require("../models/carts.model.js");
const messageModel = require("../models/messages.model.js");
const CartManager = require("../controllers/CartManager.js");


//controller: 
const productController= require("../controllers/products.controller.js");
const pData= new productController();
//middleware Users: 
const AllowedUser = require("../controllers/checkRoles.js");

//DTO: 
const userDTO = require("../dto/userDTO.js")

const passport = require("passport")
const viewsRouter = express.Router();
const productData = new ProductManager();
const cartData = new CartManager();

const cartController = require("../controllers/cart.controller.js");
const cData = new cartController();

viewsRouter.get("/products", passport.authenticate("jwt", {session:false}), AllowedUser('user'), async (req,res)=>{

    try{
        const products= await pData.getP(req,res);

        const cart = req.user.cart.toString();

        const cartID = await CartModel.findById(cart); 

        console.log("carrito!!!", req.user.cart.toString())
        console.log("Carrito???", cartID.products)

        let cartCount = 0;

        if(cartID && cartID.products){
            cartID.products.forEach(product => {
                cartCount += product.quantity;
            });
            // cartCount = cartID.products.length;
        }

        const user= {
            cart: cart,
            cartCount: cartCount,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            rol: req.user.rol
        };
        console.log(user)

        //enviamos la información a la vista
        res.render("products", 
        {productos: products, user: user});
    }catch(error){
        res.status(500).send({error: "Error interno del servidor"});
    }
    
});

viewsRouter.get("/home", passport.authenticate("jwt", {session:false}), async(req,res)=>{
    const user= {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        rol: req.user.rol
    };

    res.render("home", {user: user});
})

viewsRouter.get("/carrito", async(req, res)=>{
    try{
        //Llamamos la infomación del carrito desde el Manager
         const carrito = await cartData.getCartAll();

        //Acá lo mostraba en consola porque no funcionaba en handlebars jeje.
         //console.log(carrito);

         ///sin esto, handlebars no me leía los datos.
         //básicamente lo que hace es: 
         // con JSON.stringify convierte la infomación en cadena JSON y con JSON.parse lo vuelve un objeto para que Handlebars lo pueda leer correctamente. 
         const carts = JSON.parse(JSON.stringify(carrito.message));
         

         //renderizamos y enviamos la información a la vista. 
         res.render("carrito", {carrito: carts})
        
    }catch(error){
        res.status(500).send({error: "Error interno del servidor"})
    }
})

viewsRouter.get("/realtimeproducts",passport.authenticate("jwt", {session:false}), AllowedUser('admin'), async (req,res)=>{

    try{
        const products = await productData.getProducts();

        res.render("realTimeProducts", {productos: products});
    }catch(error){
        console.log("Error al obtener productos", error);
        res.status(500).send({error: "Error interno del servidor"});
    }
    
})

viewsRouter.get("/chat",passport.authenticate("jwt", {session:false}), AllowedUser('user'), async (req,res)=>{
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


viewsRouter.get("/register", async (req,res)=>{
        res.render("register")
})

viewsRouter.get("/login", async (req, res)=>{
        res.render("login")
})

viewsRouter.get("/current",passport.authenticate("jwt", {session:false}), async (req, res)=>{
   try {
    const {first_name, last_name, rol} = req.user;

    const user = new userDTO(first_name, last_name, rol);

    res.render("current", {user:user});
   } catch (error) {
    res.status(401).send("Acceso denegado.");
   }
   
    
})


viewsRouter.post("/carts/:cid/products/:pid", passport.authenticate("jwt", { session: false }),AllowedUser('user'), async (req, res) => {
    try {  
       await cData.addCPID(req,res);
       res.redirect("/products"); // Redirige a la página de productos después de agregar al carrito
    } catch (error) {
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

module.exports = viewsRouter;