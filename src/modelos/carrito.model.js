'use strict'
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var SchemaCarrito = Schema({
    producto: [{type: Schema.Types.ObjectId, ref: "productos"}],
    cantidad: Number,
    precio_total: Number,
    confirmar_compra: Boolean,
    usuario: {type: Schema.Types.ObjectId, ref: "usuario"}
}, {collection: "carrito"})

module.exports = mongoose.model("carrito",SchemaCarrito)