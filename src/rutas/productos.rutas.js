'use strict'
const express = require("express")
const productocontrolador = require("../controlador/producto.controlador")
const md_autenticacion = require("../middlewares/authenticated")

var api = express.Router();
api.get("/ejemploProducto", productocontrolador.ejemploProducto)
api.post("/agregarProducto",md_autenticacion.ensureAuth, productocontrolador.agregarProducto)
api.put("/editarProducto/:idProducto", md_autenticacion.ensureAuth, productocontrolador.editarProducto)
api.delete("/eliminarProducto/:idProducto", md_autenticacion.ensureAuth, productocontrolador.eliminarProducto)
api.get("/obtenerProductos", productocontrolador.obtenerProductos)
api.get("/cantidadProductos", productocontrolador.cantidadProductos)
api.get("/productoId/:idProducto", productocontrolador.buscarProductoId)
api.get("/productoNombre/:nombreProducto", productocontrolador.buscarProductoNombre)
api.get("/productosCategoria/:idCategoria", productocontrolador.productosCategoria)
api.get("/masVendido", productocontrolador.obtenerProductoMasVendido)
api.get("/productoAgotado", productocontrolador.productosAgotados)

module.exports = api;