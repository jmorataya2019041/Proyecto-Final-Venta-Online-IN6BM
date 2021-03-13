'use strict'
const mongoose = require("mongoose")
const app = require("./app")
const admin = require("./src/controlador/usuario.controlador")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ventaonline",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=>{
    console.log("Se encuentra conectado a la base de datos")

    createAdmin();

    app.listen(3000, function(){
        console.log("Está funcionando en el puerto 3000")
    })
}).catch(err => console.log(err))

const createAdmin =()=>{
    admin.agregarAdmin("Admin", "123456", "Admin")
}