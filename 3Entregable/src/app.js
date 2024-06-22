import express from "express"; //Modulo de express
const app = express();
const PUERTO = 8080; 

//Importo el Product Manager para poder utilizarlo en mis rutas:
import ProductManager from "./controllers/ProductManager.js";
const productData = new ProductManager();

app.use(express.json()); //Middleware que me permite que pueda comunicarme con el servidor en formato '.JSON'.


//Rutas:


//Ruta para obtener todos los productos o para obtener un límite de productos (por ejemplo, los primeros 5)
app.get('/products', async (req,res) =>{
    //Esperamos la función de la clase de ProductManager:
    const product = await productData.getProducts();
    
    //Si funciona, es decir, si sucess== true, se busca el límiite o se le aplica.
    if(product.success){ 
      const prod = product.message;
      const limit = req.query.limit ? parseInt(req.query.limit) : product.length;
      const productLimit = prod.slice(0,limit);
      res.status(200).send(productLimit)}
      else {res.status(400).send("Error al cargar datos")}

});



//Ruta para obtener el producto según el ID indicado. (Por ejemplo; Producto con ID 5, solo se muestra ese.)
app.get('/products/:pid', async (req, res) =>{
    //Pedimos el parametro del id, en este caso como se pide en la ruta: 'pid'.
    const id = req.params.pid;
    const product = await productData.getProductsByID(parseInt(id));

    //Si es exitoso, se muestra un mensaje, si no, se muestra otro, que ya los he expecificado en la clase. 
    if(product.success){
      res.status(200).send(product.message);
    }else {
      res.status(400).send(product.message);
    }
})




app.listen(PUERTO, ()=>{
    console.log(`Server on http://localhost:${PUERTO}`)
})