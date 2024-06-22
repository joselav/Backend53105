//Aplicamos conexión con MONGODB:
const mongoose = require("mongoose");

//creamos la conección:

mongoose.connect("mongodb+srv://josefinalavinia05:1234Coder@cluster0.f5zhko4.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Conexión con DB exitosa"))
    .catch((error)=> console.log("Error en la conexión", error))