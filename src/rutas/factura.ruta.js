'use strict'
const express = require("express")
const facturacontrolador = require("../controlador/factura.controlador")
const md_autenticacion = require("../middlewares/authenticated")

var api = express.Router();
api.get("/ejemploFactura", facturacontrolador.ejemploFactura)
api.get("/visualizarFactura/:idUsuario", md_autenticacion.ensureAuth, facturacontrolador.visualizarFactura)

module.exports = api;