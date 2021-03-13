'use strict'
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors")

//Cabeceras
app.use(cors());

//Importación de rutas
const usuario_ruta = require("./src/rutas/usuario.rutas")
const autorizacion_ruta = require("./src/rutas/autorizacion.rutas")
const cliente_ruta = require("./src/rutas/cliente.rutas")
const categoria_ruta = require("./src/rutas/categoria.rutas")
const producto_ruta = require("./src/rutas/productos.rutas")
const factura_ruta = require("./src/rutas/factura.ruta")
const carrito_ruta = require("./src/rutas/carrito.rutas")

//Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Carga de rutas
app.use("/proyecto", usuario_ruta)
app.use("/proyecto", autorizacion_ruta)
app.use("/proyecto", cliente_ruta)
app.use("/proyecto", categoria_ruta)
app.use("/proyecto", producto_ruta)
app.use("/proyecto", factura_ruta)
app.use("/proyecto", carrito_ruta)

module.exports = app;