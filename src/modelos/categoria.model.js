'use strict'
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var CategoriaSchema = Schema({
    nombre: String
}, {collection: 'categoria'})

module.exports = mongoose.model("categoria", CategoriaSchema)