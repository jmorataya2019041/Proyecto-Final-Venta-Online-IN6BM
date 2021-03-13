'use strict'
const express = require("express")
const usuariocontrolador = require("../controlador/usuario.controlador")
const md_autenticacion = require("../middlewares/authenticated")

var api = express.Router();
api.get("/ejemploUsuario",usuariocontrolador.ejemplo);
api.post("/agregarUser",md_autenticacion.ensureAuth, usuariocontrolador.registrarUsuario)

module.exports = api;