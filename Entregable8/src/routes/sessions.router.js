const express = require("express");
const sessionRouter = express.Router();

const UserModel = require("../models/users.models.js")

//Registro:
sessionRouter.post("/", async (req, res)=>{

    //Pedimos la información, enviada del formulario, desde el body
    const {first_name, last_name, age, email, password} = req.body;

    try {

        //Nos aseguramos que el email que intenta registrarse no exista en nuestra BD
        const existUser = await UserModel.findOne({email: email});

        if(existUser){
         res.status(400).send("El correo electrónico ingresado ya existe.")
        }

        //Creamos el usuario en nuestra base de datos y guardamos los datos. 
        const createUser = await UserModel.create({first_name, last_name, age, email, password});

        //Nos aseguramos de armar la sesión;
        req.session.login = true;
        req.session.user ={...createUser._doc};

        //Redirigimos a la página de productos: 
        res.redirect("/products");
        
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

sessionRouter.post("/login", async (req, res)=>{

    //Pedimos los datos desde el body
    const {email, password} = req.body;

    try {
        //Nos aseguramos que el email enviado sea identico al que nos ha pasado el usuario
        const user = await UserModel.findOne({email:email});

        //Si el usuario existe, nos aseguramos que la contraseña sea válida, dependiendo el caso enviamos respuesta de error o éxito;
        if(user){
            if(user.password === password){

                //Si la contraseña es la misma, iniciamos la sesión
                req.session.login = true; 
                req.session.user = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    age: user.age,
                    email: user.email, 
                    rol: user.rol
                };

                //Y también redirigimos al usuairo a la siguiente página
                res.redirect("/products");
            }else{
                //En caso que no sea correcto, mensaje de error
                res.status(401).send("Contraseña incorrecta")
            }
        } else{
            res.status(404).send("El usuario no se ha encontrado");
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

sessionRouter.get("/logout", async (req, res)=>{
    if(req.session.login){
        req.session.destroy();
    }

    res.redirect("/login")
})
module.exports = sessionRouter;