'use strict'
const express = require("express")
const categoriacontrolador = require("../controlador/categoria.controlador")
const md_autenticacion = require("../middlewares/authenticated")

var api = express.Router();
api.get("/ejemploCategoria", categoriacontrolador.ejemploCategoría)
api.post("/agregarCategoria", md_autenticacion.ensureAuth, categoriacontrolador.agregarCategoria)
api.put("/editarCategoria/:idCategoria", md_autenticacion.ensureAuth, categoriacontrolador.editarCategoría)
api.delete("/eliminarCategoria/:idCategoria", md_autenticacion.ensureAuth, categoriacontrolador.eliminarCategoría)
api.get("/categorias", categoriacontrolador.categorias)
api.get("/categoriaNombre/:nombreCategoria", categoriacontrolador.buscarNombreCategoria)
api.get("/categoriaId/:idCategoria", categoriacontrolador.buscarCategoriaId)

module.exports = api;