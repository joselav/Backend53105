const express =require ("express"); 
const ProductManager= require("../controllers/ProductManager.js");
const ProductModel = require("../models/products.model.js");
const messageModel = require("../models/messages.model.js");
const CartManager = require("../controllers/CartManager.js")

const passport = require("passport")
const viewsRouter = express.Router();
const productData = new ProductManager();
const cartData = new CartManager();

viewsRouter.get("/products", passport.authenticate("jwt", {session:false}), async (req,res)=>{

    //definimos el limit, pidiendo el dato que nos envíao o 10 por defecto;
    const limit =req.query.limit ||  10; 
    //Lo mismo con la page, la que nos envían o 1 por defecto;
    const page = req.query.page || 1; 
    //También con el sort, lo que ellos decidan o ascendente por defecto;
    const sort = req.query.sort || 'asc';
    //En el caso de la categoría, que es el dato que muestro en pantalla, la que ellos decidan o nada y que se muestren todos los elementos
    const category = req.query.category || '';

    try{
       //enviamos la información al cartManager para que los pueda leer
        const products = await productData.getProducts(limit, page, sort, category);

        const user= {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            rol: req.user.rol
        };
        console.log(user)

        //enviamos la información a la vista
        res.render("home", 
        {productos: products, user: user});
    }catch(error){
        console.log("Error al obtener productos", error);
        res.status(500).send({error: "Error interno del servidor"});
    }
    
});

viewsRouter.get("/carrito", async(req, res)=>{
    try{
        //Llamamos la infomación del carrito desde el Manager
         const carrito = await cartData.getCartAll();
        
        //Acá lo mostraba en consola porque no funcionaba en handlebars jeje.
         //console.log(carrito);

         ///sin esto, handlebars no me leía los datos.
         //básicamente lo que hace es: 
         // con JSON.stringify convierte la infomación en cadena JSON y con JSON.parse lo vuelve un objeto para que Handlebars lo pueda leer correctamente. 
         const cart = JSON.parse(JSON.stringify(carrito.message));


         //renderizamos y enviamos la información a la vista. 
         res.render("carrito", {carrito: cart})
        
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


viewsRouter.get("/register", async (req,res)=>{
        res.render("register")
})

viewsRouter.get("/login", async (req, res)=>{
        res.render("login")
})

viewsRouter.get("/current",passport.authenticate("jwt", {session:false}), async (req, res)=>{
    const user= {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        rol: req.user.rol
    };

    res.render("current", {user:user});
})

module.exports = viewsRouter;