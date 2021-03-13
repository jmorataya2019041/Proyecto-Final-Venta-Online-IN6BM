'use strict'
const express = require("express")
const clientecontrolador = require("../controlador/cliente.controlador")
const md_autenticacion = require("../middlewares/authenticated")

var api = express.Router();
api.get("/ejemploCliente", clientecontrolador.ejemploCliente)
api.post("/registrarme", clientecontrolador.registrarme)
api.put("/editar/:idUsuario", md_autenticacion.ensureAuth, clientecontrolador.editar)
api.delete("/eliminar/:idUsuario", md_autenticacion.ensureAuth, clientecontrolador.eliminar)
api.put("/editarRol/:idUsuario", md_autenticacion.ensureAuth, clientecontrolador.editarRol)
api.get("/buscarCliente/:idCliente", clientecontrolador.buscarClienteId)

module.exports = api;