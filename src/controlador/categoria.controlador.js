'use strict'
const Categoria = require("../modelos/categoria.model")
const Producto = require("../modelos/productos.model")

//Función de ejemplo
function ejemploCategoría(req, res) {
    return res.status(200).send({ mensaje: "Ejemplo desde categoría controlador" })
}

//Función para agregar Categoría
function agregarCategoria(req, res) {
    if (req.user.rol === "Admin") {
        var categoriaModel = new Categoria();
        var params = req.body;
        if (params.nombre) {
            categoriaModel.nombre = params.nombre;

            Categoria.find({
                $or: [
                    { nombre: categoriaModel.nombre }
                ]
            }).exec((err, categoriaEncontrada) => {
                if (err) {
                    return res.status(500).send({ mensaje: "Error en la petición" })
                } else if (categoriaEncontrada && categoriaEncontrada.length >= 1) {
                    return res.status(500).send({ mensaje: "Categoría existente" })
                } else {
                    categoriaModel.save((err, guardado) => {
                        if (err) {
                            return res.status(500).send({ mensaje: "Error en la petición" })
                        } else if (!guardado) {
                            return res.status(500).send({ mensaje: "No se ha podido guardar la categoría" })
                        } else {
                            return res.status(200).send({ Categoría: guardado })
                        }
                    })
                }
            })
        }
    } else {
        return res.status(500).send({ mensaje: "No tiene el rol de autorización para agragar una ruta" })
    }
}

//Función para editar categoría
function editarCategoría(req, res) {
    if (req.user.rol === "Admin") {
        var idCategoria = req.params.idCategoria;
        var params = req.body;

        Categoria.findByIdAndUpdate(idCategoria, params, { new: true, useFindAndModify: false }, (err, editado) => {
            if (err) {
                return res.status(500).send({ mensaje: "Error en la petición" })
            } else if (!editado) {
                return res.status(500).send({ mensaje: "Error al editar la categoría" })
            } else {
                return res.status(500).send({ Categoría_Editada: editado })
            }
        })
    } else {
        return res.status(500).send({ mensaje: "No tiene el rol de autorización para editar la categoría" })
    }
}

//Función para eliminar categoría
async function eliminarCategoría(req, res) {
    if (req.user.rol === "Admin") {
        var idCategoria = req.params.idCategoria;
        const categoriaUsada = await Producto.find({categoria: {$in: idCategoria}});
        const idDefault = await Categoria.find({nombre: {$in: "Default"}});
        if(categoriaUsada && categoriaUsada.length === 0){
            await Categoria.findByIdAndDelete(idCategoria, (err, eliminado)=>{
                if(err){
                    return res.status(500).send({mensaje: "Error al eliminar la categoría"})
                }else{
                    return res.status(200).send({Categoría_Eliminada: eliminado, mensaje:"La gategoría no poseía ningún producto"})
                }
            })
        }else{
            await Producto.findByIdAndUpdate(categoriaUsada[0]._id, {categoria: idDefault[0]._id}, {new: true, useFindAndModify: false});
            await Categoria.findByIdAndDelete(idCategoria, (err, eliminado)=>{
                if(err){
                    return res.status(500).send({mensaje: "Error en la petición"})
                }else{
                    return res.status(200).send({Categoría_Eliminada: eliminado, mensaje: "La categoría poseía productos, los cuales se fueron a una categoría por default"})
                }
            })
        }
    } else {
        return res.status(500).send({ mensaje: "No tiene el rol de autorización para eliminar la categoría" })
    }
}

//Función para obtener todas las categorías
function categorias(req, res) {
    Categoria.find({}, { __v: 0 }, (err, categorias) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!categorias) {
            return res.status(500).send({ mensaje: "No se han encontrado las categorías" })
        } else {
            return res.status(200).send({ Categorías: categorias })
        }
    })
}

//Buscar por el nombre de la categoría
function buscarNombreCategoria(req, res) {
    var nombreCategoria = req.params.nombreCategoria;

    Categoria.find({ "nombre": { $regex: nombreCategoria, $options: 'i' } }, { "nombre.$": 1 }, (err, encontrada) => {
        if (err) {
            console.log(err)
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!encontrada) {
            return res.status(500).send({ mensaje: "No se ha podido encontrar la categoría" })
        } else {
            return res.status(200).send({ Categoría: encontrada })
        }
    })
}

//Buscar categoría por id
function buscarCategoriaId(req, res) {
    var idCategoria = req.params.idCategoria;

    Categoria.findById(idCategoria, (err, categoriaEncontrada) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!categoriaEncontrada) {
            return res.status(500).send({ mensaje: "No se ha podido encontrar la categoría" })
        } else {
            return res.status(200).send({ Categoria_Encontrada: categoriaEncontrada })
        }
    })
}

module.exports = {
    ejemploCategoría,
    agregarCategoria,
    editarCategoría,
    eliminarCategoría,
    categorias,
    buscarNombreCategoria,
    buscarCategoriaId
}