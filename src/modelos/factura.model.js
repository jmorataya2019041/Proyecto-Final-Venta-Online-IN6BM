'use strict'
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var FacturaSchema = Schema({
    producto: {type: Schema.Types.ObjectId, ref: "productos"},
    cantidad: Number,
    precio_total: Number,
    usuario: {type: Schema.Types.ObjectId, ref: "usuario"}
}, {collection: "factura"})

module.exports = mongoose.model("factura", FacturaSchema)