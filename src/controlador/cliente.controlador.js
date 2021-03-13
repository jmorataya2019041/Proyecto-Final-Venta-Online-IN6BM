'use strict'
const Usuario = require("../modelos/usuario.model")
const bcrypt = require("bcrypt-nodejs");

//Función de ejemplo
function ejemploCliente(req, res){
    return res.status(200).send({mensaje: "Ejemplo desde cliente controlador"})
}

//Función para registrar cliente
function registrarme(req, res){
    var usuarioModel = new Usuario();
    var params = req.body;

    if(params.usuario && params.password){
        usuarioModel.usuario = params.usuario;
        usuarioModel.rol = "Cliente";

        Usuario.find({$or : [
            {usuario: usuarioModel.usuario}
        ]}).exec((err, usuarioEncontrado)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(usuarioEncontrado && usuarioEncontrado.length >= 1){
                return res.status(500).send({mensaje: "El usuario es existente!!!"})
            }else{
                bcrypt.hash(params.password, null, null, (err, passEncrypt)=>{
                    usuarioModel.password = passEncrypt;

                    usuarioModel.save((err, guardado)=>{
                        if(err){
                            return res.status(500).send({mensaje: "Error en la petición"})
                        }else if(!guardado){
                            return res.status(500).send({mensaje: "No se ha podido guardar el registro"})
                        }else{
                            return res.status(200).send({Usuario: guardado})
                        }
                    })
                })
            }
        })
    }
}

//Función para editar
function editar(req, res){
    var idUsuario = req.params.idUsuario;
    var params = req.body;

    delete params.password;

    if(idUsuario != req.user.sub){
        return res.status(500).send({Alerta: "No tiene la autorización para editar"})
    }

    Usuario.findByIdAndUpdate(idUsuario, params, {new: true, useFindAndModify: false}, (err, usuarioEditado)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!usuarioEditado){
            return res.status(500).send({mensaje: "No se ha podido editar al usuario"})
        }else{
            return res.status(200).send({Usuario_Editado: usuarioEditado})
        }
    })
}

//Función para eliminar
function eliminar(req, res){
    const idUsuario = req.params.idUsuario;

    if(idUsuario != req.user.sub){
        return res.status(500).send({mensaje: "No tiene la autorización para eliminar"})
    }

    Usuario.findByIdAndDelete(idUsuario,(err, usuarioEliminado)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!usuarioEliminado){
            return res.status(500).send({mensaje: "Error al eliminar"})
        }else{
            return res.status(200).send({Usuario_Eliminado: usuarioEliminado})
        }
    })
}

//Función para editar rol
function editarRol(req, res){
    if(req.user.rol === "Admin"){
        var idUsuario = req.params.idUsuario;
        var params = req.body;

        Usuario.findByIdAndUpdate(idUsuario, {"rol": params.rol}, {new: true, useFindAndModify: false}, (err, rolEditado)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!rolEditado){
                return res.status(500).send({mensaje: "No se ha podido editar el rol del Usuario"})
            }else{
                return res.status(200).send({Usuario_Editado: rolEditado})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para buscar el cliente
async function buscarClienteId(req, res){
    var idCliente = req.params.idCliente;
    await Usuario.findById(idCliente, (err, encontrado)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!encontrado){
            return res.status(500).send({mensaje: "No se ha podido encontrar al cliente"})
        }else{
            return res.status(200).send({encontrado})
        }
    })
}

module.exports = {
    ejemploCliente,
    registrarme,
    editar,
    eliminar,
    editarRol,
    buscarClienteId
}