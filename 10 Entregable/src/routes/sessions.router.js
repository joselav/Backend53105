const express = require("express");
const sessionRouter = express.Router();

//Importamos passport: 
const passport = require("passport");

//jwt
const jwt = require("jsonwebtoken")

const UserModel = require("../models/users.models.js")


const {createHash, validatePassword} = require("../utils/bcrypt.js")


/// Login y Registro con Passport: 

sessionRouter.post("/", async (req, res)=>{

    //Pedimos la información, enviada del formulario, desde el body
    const {first_name, last_name, age, email, password} = req.body;

    try {

        //Nos aseguramos que el email que intenta registrarse no exista en nuestra BD
        const existUser = await UserModel.findOne({email: email});

        if(existUser){
         res.status(400).send("El correo electrónico ingresado ya existe.")
        }

        const passHash = createHash(password);
        //Creamos el usuario en nuestra base de datos y guardamos los datos. 
        const createUser = await UserModel.create({first_name, last_name, age, email, password: passHash});

        createUser.save()

        const token = jwt.sign({email}, "SecretCoder", {expiresIn:"1h"});

        //Mandamos cookie como Token:
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, //Le decimos que su duración máxima es de una hora.
            httpOnly: true //La cookie solo se puede acceder por HTTP.
        })

        //Redirigimos a la página de productos: 
        res.redirect("/products");
        
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

     

//Iniciar sesión/ Log In
sessionRouter.post("/login", async (req, res)=>{

    //Pedimos los datos desde el body
    const {email, password} = req.body;

    try {
        //Nos aseguramos que el email enviado sea identico al que nos ha pasado el usuario
        const user = await UserModel.findOne({email:email});


           if(!user){
            res.status(404).send("El usuario no se ha encontrado");
           }

           //Si no existe la contraseña o es inválida, enviamos error: 
           if(!validatePassword(password, user)){
            console.log("Contraseña incorrecta");
            return res.status(401).send("Contraseña incorrecta")
        }

            const token = jwt.sign({email}, "SecretCoder", {expiresIn:"1h"});

            //Mandamos cookie como Token:
            res.cookie("coderCookieToken", token, {
                maxAge: 3600000, //Le decimos que su duración máxima es de una hora.
                httpOnly: true //La cookie solo se puede acceder por HTTP.
            })

            
            //Y también redirigimos al usuairo a la siguiente página
            res.redirect("/products");

    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

//Cerrar sesión/ Log Out
sessionRouter.get("/logout", async (req, res)=>{
    res.clearCookie("coderCookieToken")
    res.redirect("/login")
})


//github: 
sessionRouter.get("/github", passport.authenticate("github", {scope: ["user:email"]}), async (req, res)=>{
    
})

sessionRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect:"/login"}), async (req, res)=>{
    //La estratégia de GitHub ya nos retornara un usuario, así que se lo pedimos: 
    req.user = req.user;
    req.login= true;
    
    res.redirect("/products");
})



module.exports = sessionRouter;


//usuario coder:

// email
// "adminCoder@coder.com"
// password
// "adminCod3r123"
