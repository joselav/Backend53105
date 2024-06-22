//Importamos módulos de passport: 
const passport = require("passport");
const local = require("passport-local");
const GitHubStrategy = require("passport-github2");

const localStrategy = local.Strategy;

//Importamos userModel y hasheos:
const userModel = require("../models/users.models.js")
const {createHash, validatePassword} = require("../utils/bcrypt.js")

const initializePassport = () =>{

    //Creamos estratégia para Registro:
    passport.use("register", new localStrategy({
        //Le informamos que queremos ingresar al objeto req: 
        passReqToCallback: true, 
        //Le informo que el campo para el usuario es el email:
        usernameField: "email",
        //

    }, async (req, username, password, done) =>{
        //Nos traemos los datos que recibimos desde el registro: 
        const {first_name,last_name, age, email } = req.body;

        try {
            //Validamos los datos que nos envió no se encuentren ya registrados en nuestra DB: 
            const user = await userModel.findOne({email: email});

            //Si existe el usuario, enviamos error:
            if(user){
                return done(null, false);
            }

            //Si no existe, creamos el registro;

            const passHash = createHash(password);

            const newUser = await userModel.create({
                first_name, last_name, age, email, password: passHash
            })
            
            return done(null, newUser)
        } catch (error) {
            return done(error)
        }
}))

    //Creamos estratégia para Login: 
    passport.use("login", new localStrategy({
        usernameField: "email",
    }, async (email, password, done)=>{
        try {
            //Verificamos que el usuario ya esté registrado con esos datos en nuestra DB: 
            const user = await userModel.findOne({email: email});

            //si el usuario no existe enviamos error: 
            if(!user){
                console.log("El usuario ingresado no existe en nuestra DB");
                return done(null, false)
            }

            //En caso contrario, si el usuario existe: 
            //Verificamos que la contraseña enviada sea correcta con el validatePassword de Bcrypt: 


            //Si no existe la contraseña o es inválida, enviamos error: 
            if(!validatePassword(password, user)){
                console.log("Contraseña incorrecta");
                return done(null, false)
            }

            //Si la contraseña es correcta, devolvemos el usuario: 
            return done(null, user)

        } catch (error) {
            return done(error)
        }
}))


    //Serializar Usuario: 
    passport.serializeUser((user,done)=>{
        done(null, user._id);
    })

    //Deserializar Usuario: 
    passport.deserializeUser(async (id, done)=>{
        const user = await userModel.findById({_id: id});
        done(null, user);
    })


    //Estratégia de GitHub: 
    passport.use("github", new GitHubStrategy({
        clientID: 'Iv1.61675a20d95dfbea',
        clientSecret:"cbd8a2bfb3690d8fe4efe197e55acdf6972fdd1f",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
    }, async(accessToken, refreshToken, profile, done)=>{

        //Nos aseguramos que estamos recibiendo bien los datos desde un console.log: 
        console.log("Perfil del usuario", profile);

        try {
            const user = await userModel.findOne({email:profile._json.email});

            //Si no está el usuario: 
            if(!user){
                const newUser = await userModel.create({
                    first_name: profile._json.name,
                    last_name: "usuario",
                    age: 18,
                    email: profile._json.email,
                    password: ""
                })

                done(null, newUser)
            }else{
                done(null, user)
            }

        } catch (error) {
            return done(error)
        }
    }))

}

module.exports= initializePassport;