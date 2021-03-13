'use strict'
const Usuario = require("../modelos/usuario.model");
const bcrypt = require("bcrypt-nodejs")
const jwt = require("../servicios/jwt")

//Función de ejemplo
function ejemplo(req, res){
    return res.status(200).send({mensaje: "Esto es un ejemplo desde Usuario Controlador"})
}

//Función para agregar Admin por defecto
function agregarAdmin(usuario, password, rol){
    var usuarioModel = new Usuario();
    if(usuario && password && rol){
        usuarioModel.usuario = usuario;
        usuarioModel.password = password;
        usuarioModel.rol = rol;
        Usuario.find({$or: [
            {usuario: usuarioModel.usuario},
            {rol: usuarioModel.rol}
        ]}).exec((err, adminEncontrado)=>{
            if(err){
                console.log(err)
            }else if(adminEncontrado && adminEncontrado.length >= 1){
                console.log("El administrador ya es existente!")
            }else{
                bcrypt.hash(usuarioModel.password, null, null, (err, passEncrypt)=>{
                    usuarioModel.password = passEncrypt;
                    usuarioModel.save((err, guardado)=>{
                        if(err){
                            console.log("Error en la petición")
                        }else if(!guardado){
                            console.log("No se ha podido guardar el usuario")
                        }else{
                            console.log(guardado)
                        }
                    })
                })
            }
        })
    }
}

//Función para registrar Usuario
function registrarUsuario(req, res){
    if(req.user.rol === "Admin"){
        var usuarioModel = new Usuario();
        var params = req.body;

        if(params.usuario && params.password && params.rol){
            usuarioModel.usuario = params.usuario;
            usuarioModel.rol = params.rol;

            Usuario.find({$or: [
                {usuario: usuarioModel.usuario}
            ]}).exec((err, usuarioObtenido)=>{
                if(err){
                    return res.status(500).send({mensaje: "Error en la petición"})
                }else if(usuarioObtenido && usuarioObtenido.length >= 1){
                    return res.status(500).send({mensaje: "El usuario es existente!!"})
                }else{
                    bcrypt.hash(params.password, null, null,(err, passEncrypt)=>{
                        usuarioModel.password = passEncrypt;

                        usuarioModel.save((err, usuarioGuardado)=>{
                            if(err){
                                return res.status(500).send({mensaje: "Error en la petición"})
                            }else if(!usuarioGuardado){
                                return res.status(500).send({mensaje: "No se ha podido guardar al usuario"})
                            }else{
                                return res.status(200).send({Usuario: usuarioGuardado})
                            }
                        })
                    })
                }
            })
        }
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

module.exports = {
    ejemplo,
    registrarUsuario,
    agregarAdmin
}