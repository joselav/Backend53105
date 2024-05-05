const UserModel = require("../models/users.models.js");

class SessionServices{

    async createUser(data){
         //Nos aseguramos que el email que intenta registrarse no exista en nuestra BD
         const existUser = await UserModel.findOne({email: email});

         if(existUser){
          res.status(400).send("El correo electrónico ingresado ya existe.")
         }

        try {
            const createUser = await UserModel.create(data);
            return await createUser.save()
        } catch (error) {
            throw new Error("Error al crear usuario");
        }
    }

    async loginUser(data){
        try {
             //Nos aseguramos que el email enviado sea identico al que nos ha pasado el usuario
            const user = await UserModel.findOne(data);
            return user;

        } catch (error) {
            throw new Error("Error al logear usuario");
        }
    }


}

module.exports = SessionServices;