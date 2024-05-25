AllowedUser = (role) =>{

    return async (req, res, next) =>{
      if(req.user && req.user.rol === role){
            next()
        }else{
            res.status(403).send("Acceso denegado");
        }
    }
}

module.exports= AllowedUser;