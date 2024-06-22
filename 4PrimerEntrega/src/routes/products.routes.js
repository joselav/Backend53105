import { Router } from "express"; ///Importamos Router desde express.
import ProductManager from "../controllers/ProductManager.js"; //Llamamos al ProductManager.

const productRouter = Router(); //Definimos el ProductRouter.
const productData = new ProductManager(); //Y también definimos el ProductManager. 

//Definimos las rutas: 


//Ruta para obtener todos los productos o para obtener un límite de productos (por ejemplo, los primeros 5)
productRouter.get('/', async (req,res) =>{
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
productRouter.get('/:pid', async (req, res) =>{
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


//Ruta para agregar un producto: 
productRouter.post('/', async (req, res)=> {
    //Primero, pedimos todos los campos desde el req.body:
    const {title, description, price, thumbnail, code, stock} = req.body; 
    //Ahora definimos la constante para que se guarden con las características especificadas en el ProductManager:
    const product = await productData.addProduct(title, description, price, thumbnail, code, stock);

    if(product.success){
        res.status(200).send(product.message);
    }else{
        res.status(400).send(product.message );
    }

    ///Formato para subir nuevo producto: 
        // title: Cadena
        // description: Cadena
        // code: Cadena
        // price: Número
        // stock: Número


    //thumbnail: no es un campo obligatorio, pero de incluirlo es Cadena. 
    //status: por default es true, no se agrega. 
    //id: se autoincrementa, es Número.

    //{"title": "Premezcla para Chipa",
    // "description": "Premezcla con diferentes almidones, especial para preparación de chipás.",
    // "price": 3.50,
    // "thumbnail": "sin imágen",
    // "code": "CHI0001",
    // "stock": 30} 

});

//Ruta para actualizar producto según su número de ID: 
productRouter.put('/:pid', async (req, res)=>{
    //Al igual que en el get/:pid, pedimos el id como parámetro:
    const {pid} = req.params;
    //Pedimos los datos que ya están guardados del producto con req.body;
    const dataProd = req.body;
    //Ahora enviamos la información al ProductManeger para que controle con sus especificaciones: 
    //Usamos parseInt para especificar que se espera un número. 
    const product = await productData.updateProduct(parseInt(pid), dataProd);

    if(product.success){
        res.status(200).send(product.message);
    }else{
        res.status(400).send(product.message);
    }
});


//Ruta para eliminar producto según su ID:
productRouter.delete('/:pid', async (req,res)=>{
    //Pedimos el Id como parámetro: 
    const {pid} = req.params;
    //Enviamos la información al ProductManager para que controle las especifícaciones definidas ahí.
    const productDelete = await productData.deleteProduct(parseInt(pid));
    
    if(productDelete.success){
        res.status(200).send(productDelete.message);
    }else{
        res.status(400).send(productDelete.message);
    }
})




export default productRouter; //Exportamos el productRouter para poder utilizarlo y llamarlo en el app.js

