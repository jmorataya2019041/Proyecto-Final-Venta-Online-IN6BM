'use strict'
const express = require("express")
const carritocontrolador = require("../controlador/carrito.controlador")
const md_autenticacion = require("../middlewares/authenticated")

var api = express.Router();
api.get("/ejemploCarrito", carritocontrolador.ejemploCarrito)
api.post("/agregarCarrito", md_autenticacion.ensureAuth, carritocontrolador.agregarCarrito)
api.put("/confirmarCompra/:idCarrito", md_autenticacion.ensureAuth, carritocontrolador.confirmarCarrito)

module.exports = api;