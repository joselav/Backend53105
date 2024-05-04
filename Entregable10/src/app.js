//import express from "express"; //Modulo de express


//versión sin importación ("type": "module"):

const express = require("express")
// const session = require("express-session");
const app = express();
const PUERTO = 8080; 

//importamos cookie parser: 
const cookieParser = require("cookie-parser");
//importamos Passport: 
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");

//mongoose:
require("./database.js");

//handlebars & socket.io;
const handlebars = require("express-handlebars");
const socket = require("socket.io");
const ProductManager = require("./controllers/ProductManager.js");
const productData = new ProductManager();


//Importamos las rutas del carrito y de los productos: 
//import productRouter from "./routes/products.routes.js";
//import cartRouter from "./routes/carts.routes.js";

//versión sin importación ("type": "module"):
const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const viewRouter = require("./routes/views.router.js");
const sessionRouter = require("./routes/sessions.router.js")


app.use(express.json()); //Middleware que me permite que pueda comunicarme con el servidor en formato '.JSON'.
app.use(express.urlencoded({extended: true}));

// //Middleware para session: 
// app.use(session({
//     secret: "SecretCoder",

//     //Esta línea(configuración) me permite mantener la sesión activa ante la inactividad del usuario:
//     resave: true,

//     //Este me permite guardar el objeto de sesión, incluso si no tiene nada para guardar:
//     saveUninitialized: true
// }))


//cambios con passport: 
app.use(passport.initialize());
initializePassport();
//cookieparser: 
app.use(cookieParser());

// app.use(passport.session());


app.use(express.static("./src/public"));

//Configuración de handlebars:
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");



//Rutas:
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter)
app.use('/', viewRouter);




const httpServer = app.listen(PUERTO, ()=>{
    console.log(`Server on http://localhost:${PUERTO}`)
})

//socket.io:

const io = socket(httpServer);

//model chat:
const messageModel= require("./models/messages.model.js");
//Conectamos Socket:
io.on('connection', (socket) => {
    console.log("Cliente conectado");

    socket.on('nuevoProducto', async (prod) => {
        try {

            //Agregamos el producto nuevo escuchando la lógica de ProductManager
            const newProd = await productData.addProduct(prod.title, prod.description, prod.price, prod.thumbnail, prod.code, prod.stock);

            //Emitimos la función que lo agrega a la vista:
            socket.emit('prod', newProd);
        } catch (error) {
            //Enviamos un mensaje de error en caso de que no se pueda hacer.
            console.error("Error al agregar producto:", error);
        }
    });

    socket.on('eliminarProducto', async (prodId)=>{
        try{
            //Eliminamos el Producto con la lógica de ProductManager:
            const productDelete = await productData.deleteProduct(prodId);

            //Emitimos la función para que lo elimine de la vista:
            socket.emit("productoEliminado", prodId);

            //Mostramos el mensaje de que se ha eliminado correctamente
            console.log(productDelete.message)

        }catch(error){
            //Enviamos un mensaje de error, en caso de que no se pueda
            console.log("Error al eliminar porducto:", error);
        }
    })

    socket.on('chatMessages', async (data) => {
        const { user, message } = data;
  
        if (user && message) {
            
            try {
              const userExist = await messageModel.findOne({user});
  
            if(userExist){
              userExist.messages.push({
                date: new Date(),
                message,
              });
      
              await userExist.save();
              console.log('Mensaje guardado en MongoDB');
            }else { await messageModel.create({ user, message });
            console.log('Mensaje guardado en MongoDB');}
               
            } catch (error) {
                console.error('Error al guardar el mensaje en MongoDB:', error);
            }
  
           
            io.emit('Message', {
                user,
                date: new Date(),
                message,
            });
  
        } else {
            console.log('Datos de usuario o mensaje no válidos');
        }
    });
});


