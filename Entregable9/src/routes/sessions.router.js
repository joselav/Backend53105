const express = require("express");
const sessionRouter = express.Router();

//Importamos passport: 
const passport = require("passport");

/// Login y Registro con Passport: 


//Registro
sessionRouter.post("/", passport.authenticate("register", {failureRedirect: "/api/sessions/failedRedirect"}), async (req, res)=>{


    //Validación en caso de que la sesión no tenga los datos: 
    if(!req.user){
        res.status(400).send("Los datos enviados no son correctos");
    }
    //Creamos sesión con los datos que nos pasa el usuario
    req.session.user= {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol: req.user.rol
    };

    //Creamos sesión del login: 
    req.session.login = true;

    //redirigimos: 
    res.redirect("/products");
})

//creamos la página de error "FailedRedirect":
sessionRouter.get("/failedRedirect", (req, res)=>{
    res.send("Error al enviar registro");
})

//Iniciar sesión/ Log In
sessionRouter.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/failedLogin"}), async (req, res)=>{
      //Validación en caso de que la sesión no tenga los datos: 
      if(!req.user){
        res.status(400).send("Los datos enviados no son correctos");
        }
    
       //Creamos sesión con los datos que nos pasa el usuario
       req.session.user= {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email, 
        rol: req.user.rol
        };

        //Creamos sesión del login: 
        req.session.login = true;

        //redirigimos: 
        res.redirect("/products");


})

//Creamos el error en caso de que no se pueda iniciar sesión: 
sessionRouter.get("/failedLogin", async (req,res)=>{
    res.send("No se ha logrado iniciar sesión");
})

//Cerrar sesión/ Log Out
sessionRouter.get("/logout", async (req, res)=>{
    if(req.session.login){
        req.session.destroy();
    }

    res.redirect("/login")
})


//github: 
sessionRouter.get("/github", passport.authenticate("github", {scope: ["user:email"]}), async (req, res)=>{
})

sessionRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect:"/login"}), async (req, res)=>{
    //La estratégia de GitHub ya nos retornara un usuario, así que se lo pedimos: 
    req.session.user = req.user;
    req.session.login= true;
    
    res.redirect("/products");
})



module.exports = sessionRouter;


//usuario coder:

// email
// "adminCoder@coder.com"
// password
// "adminCod3r123"
