//import { Router } from "express"; ///Importamos Router desde express.
//import ProductManager from "../controllers/ProductManager.js"; //Llamamos al ProductManager.


//versión sin importación ("type": "module"):
const express = require("express");
const ProductManager = require("../controllers/ProductManager.js");

const productRouter = express.Router(); //Definimos el ProductRouter.
const productData = new ProductManager(); //Y también definimos el ProductManager. 

//Definimos las rutas: 


//Ruta para obtener todos los productos o para obtener un límite de productos (por ejemplo, los primeros 5)
productRouter.get('/', async (req,res) =>{
    //Definimos el Limit como 10 por defecto, o el que nos pase el usuario.
    const limit = req.query.limit || 10;
    //Definimos que nos muestre la página 1 por defecto, o la que nos pase el usuairo.
    const page = req.query.page || 1;
    //En el caso que nos pidan la categoría, la que nos pidieron o por defecto nada y nos enseña todos los productos. 
    const category = req.query.category || "";
    //Definimos que nos muetre los productos de forma ascendente por defecto, o lo que nos pida el usuario.
    const sort = req.query.sort || "asc";

    //Esperamos la función de la clase de ProductManager y le pasamos los datos:
    const product = await productData.getProducts(limit,page,sort, category);

    //Si funciona, es decir, si sucess== true, se envía la respuesta.
    if(product.success){ 
      const prod = product.message;
      
      res.status(200).send(prod)}
      else {res.status(400).send("Error al cargar datos")}

});



//Ruta para obtener el producto según el ID indicado. (Por ejemplo; Producto con ID 5, solo se muestra ese.)
productRouter.get('/:pid', async (req, res) =>{
    //Pedimos el parametro del id, en este caso como se pide en la ruta: 'pid'.
    const id = req.params.pid;
    const product = await productData.getProductsByID(id);

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
    const data = req.body; 
    //Ahora definimos la constante para que se guarden con las características especificadas en el ProductManager:
    const product = await productData.addProduct(data);

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
    const product = await productData.updateProduct(pid, dataProd);

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
    const productDelete = await productData.deleteProduct(pid);
    
    if(productDelete.success){
        res.status(200).send(productDelete.message);
    }else{
        res.status(400).send(productDelete.message);
    }
})




//export default productRouter; //Exportamos el productRouter para poder utilizarlo y llamarlo en el app.js

//versión sin importación ("type": "module"):
module.exports = productRouter;
