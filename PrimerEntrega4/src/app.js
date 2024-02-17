import express from "express"; //Modulo de express
const app = express();
const PUERTO = 8080; 

//Importamos las rutas del carrito y de los productos: 
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";

app.use(express.json()); //Middleware que me permite que pueda comunicarme con el servidor en formato '.JSON'.
app.use(express.urlencoded({extended: true}));


//Rutas:
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(PUERTO, ()=>{
    console.log(`Server on http://localhost:${PUERTO}`)
})