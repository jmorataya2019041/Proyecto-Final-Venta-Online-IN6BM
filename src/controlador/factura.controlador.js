'use strict'
const Factura = require("../modelos/factura.model")
const Producto = require("../modelos/productos.model");

//Función de ejemplo de Factura
async function ejemploFactura(req, res){
    return res.status(200).send({mensaje: "Ejemplo desde factura controlador"})
}

//Función visualizar factura de usuario
async function visualizarFactura(req, res){
    if(!req.user.sub){
        return res.status(500).send({mensaje: "No tiene la autorización"})
    }
    var idUsuario = req.params.idUsuario;

    await Factura.find({"usuario": idUsuario}, (err, facturas)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(facturas && facturas.length >= 1){
            return res.status(200).send({Factura_de_usuario: facturas})
        }else{
            return res.status(500).send({mensaje: "La persona no posee ninguna factura"})
        }
    })
}


module.exports = {
    ejemploFactura,
    visualizarFactura
}