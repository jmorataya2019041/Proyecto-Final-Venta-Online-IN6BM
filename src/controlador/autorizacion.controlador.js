'use strict'
const bcrypt = require("bcrypt-nodejs")
const jwt = require("../servicios/jwt")
const Usuario = require("../modelos/usuario.model")

//Función para logear
function login(req, res){
    var params = req.body;
    Usuario.findOne({usuario: params.usuario},(err, usuario)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(usuario){
            bcrypt.compare(params.password, usuario.password,(err, passCorrect)=>{
                if(passCorrect){
                    if(params.token === "true"){
                        return res.status(200).send({token: jwt.createToken(usuario)})
                    }else{
                        usuario.password = undefined;
                        return res.status(200).send({Usuario: usuario})
                    }
                }else{
                    return res.status(500).send({Alerta: "El usuario no ha podido registrarse"})
                }
            })
        }else{
            return res.status(500).send({mensaje: "El usuario no ha podido ingresar"})
        }
    })
}


module.exports = {
    login
}