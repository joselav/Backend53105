const express =require ("express"); 
const ProductManager= require("../controllers/ProductManager.js");

const viewsRouter = express.Router();
const productData = new ProductManager();

viewsRouter.get("/", async (req,res)=>{

    try{
        const products = await productData.getProducts();

        res.render("home", {productos: products});
    }catch(error){
        console.log("Error al obtener productos", error);
        res.status(500).send({error: "Error interno del servidor"});
    }
    
});

viewsRouter.get("/realtimeproducts", async (req,res)=>{

    try{
        const products = await productData.getProducts();

        res.render("realTimeProducts", {productos: products});
    }catch(error){
        console.log("Error al obtener productos", error);
        res.status(500).send({error: "Error interno del servidor"});
    }
    
})


module.exports = viewsRouter;