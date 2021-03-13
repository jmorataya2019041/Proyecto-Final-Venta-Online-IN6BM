'use strict'
const Carrito = require("../modelos/carrito.model")
const Factura = require("../modelos/factura.model")
const Producto = require("../modelos/productos.model")

//Función de ejemplo de carrito
function ejemploCarrito(req, res){
    return res.status(200).send({mensaje: "Ejemplo desde carrito controlador"})
}

//Función para agregar a carrito
async function agregarCarrito(req, res){
    var carritoModel = new Carrito();
    var facturaModel = new Factura();
    var params = req.body;

    if(params.producto && params.cantidad){
        carritoModel.producto = [params.producto]
        carritoModel.cantidad = params.cantidad;
        carritoModel.precio_total = params.precio_total;
        carritoModel.confirmar_compra = params.confirmar_compra;
        carritoModel.usuario = req.user.sub;
        facturaModel.producto = [params.producto];
        facturaModel.cantidad = params.cantidad;
        facturaModel.precio_total = params.precio_total;
        facturaModel.usuario = req.user.sub;
        if(params.confirmar_compra === "true"){
            facturaModel.save((err, factura)=>{
                if(err){
                    return res.status(500).send({mensaje: "Error en la petición"})
                }else if(!factura){
                    return res.status(500).send({mensaje: "No se ha podido emitir su factura"})
                }else{
                    return res.status(200).send({Factura: factura})
                }
            })
        }else{
            carritoModel.save((err, carrito)=>{
                if(err){
                    return res.status(500).send({mensaje: "Error en la petición"})
                }else if(!carrito){
                    return res.status(500).send({mensaje: "No se ha podido guardar en el carrito"})
                }else{
                    return res.status(200).send({Agregado_a_carrito: carrito})
                }
            })
        }
    }
}

//Función para editar carrito
async function confirmarCarrito(req, res){
    if(!req.user.sub){
        return res.status(500).send({mensaje: "No tiene la autorización"})
    }
    var idCarrito = req.params.idCarrito;
    var facturaModel = new Factura();
    var params = req.body;
    facturaModel.producto = [params.producto];
    facturaModel.cantidad = params.cantidad;
    facturaModel.precio_total = params.precio_total;
    facturaModel.usuario = req.user.sub;
    await Carrito.findByIdAndUpdate(idCarrito,params, (err, carritoEditado)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else{
            if(params.confirmar_compra === "true"){
                facturaModel.save((err, factura)=>{
                    if(err){
                        return res.status(500).send({mensaje: "Error en la petición"})
                    }else{
                        return res.status(200).send({Agregado_a_factura: factura})
                    }
                })
                Carrito.findByIdAndDelete(idCarrito,(err, carritoEliminado)=>{
                    if(err){
                        return res.status(500).send({mensaje: "Error en la petición"})
                    }else{
                        return res.status(200).send({Carrito_eliminado: carritoEliminado})
                    }
                })
            }
        }
    })
}

module.exports = {
    ejemploCarrito,
    agregarCarrito,
    confirmarCarrito
}