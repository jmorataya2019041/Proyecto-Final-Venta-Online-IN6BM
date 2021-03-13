'use strict'
const express = require("express")
const autorizacioncontrolador = require("../controlador/autorizacion.controlador");

var api = express.Router();
api.post("/login", autorizacioncontrolador.login)

module.exports = api;