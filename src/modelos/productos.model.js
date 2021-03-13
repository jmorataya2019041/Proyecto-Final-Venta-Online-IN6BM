'use strict'
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var SchemaProducto = Schema({
    nombre: String,
    stock: Number,
    precio: Number,
    cantidad_vendida: Number,
    categoria: {type: Schema.Types.ObjectId, ref: "categoria"}
}, {collection: "productos"})

module.exports = mongoose.model("productos", SchemaProducto)