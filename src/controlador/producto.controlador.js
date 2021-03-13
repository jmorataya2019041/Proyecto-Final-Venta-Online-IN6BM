'use strict'
const Producto = require("../modelos/productos.model")

//Función de ejemplo
function ejemploProducto(req, res){
    return res.status(200).send({mensaje: "Ejemplo desde producto controlador"})
}

//Función para agregar producto
function agregarProducto(req, res){
    if(req.user.rol === "Admin"){
        var productoModel = new Producto();
        var params = req.body;
        if(params.nombre){
            productoModel.nombre = params.nombre;
            productoModel.stock = params.stock;
            productoModel.precio = params.precio;
            productoModel.cantidad_vendida = 0;
            productoModel.categoria = params.categoria;
            
            Producto.find({$or: [
                {nombre: productoModel.nombre}
            ]}).exec((err, productoEncontrado)=>{
                if(err){
                    return res.status(500).send({mensaje: "Error en la petición"})
                }else if(productoEncontrado && productoEncontrado.length >= 1){
                    return res.status(500).send({mensaje: "El producto es existente!!"})
                }else{
                    productoModel.save((err, guardado)=>{
                        if(err){
                            return res.status(500).send({mensaje: "Error en la petición"})
                        }else if(!guardado){
                            return res.status(500).send({mensaje: "No se ha podido guardar el producto"})
                        }else{
                            return res.status(200).send({Producto: guardado})
                        }
                    })
                }
            })
        }
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización para agregar un producto"})
    }
}

//Función para editar producto
function editarProducto(req, res){
    if(req.user.rol === "Admin"){
        var idProducto = req.params.idProducto;
        var params = req.body;

        Producto.findByIdAndUpdate(idProducto, params, {new: true, useFindAndModify: false}, (err, productoEditado)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!productoEditado){
                return res.status(500).send({mensaje: "El producto no se ha podido editar"})
            }else{
                return res.status(200).send({Producto_Editado: productoEditado})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización para editar el producto"})
    }
}

//Función para eliminar producto
function eliminarProducto(req, res){
    if(req.user.rol === "Admin"){
        var idProducto = req.params.idProducto;

        Producto.findByIdAndDelete(idProducto, (err, productoEliminado)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!productoEliminado){
                return res.status(500).send({mensaje: "No se ha podido eliminar el producto"})
            }else{
                return res.status(200).send({Producto_Eliminado: productoEliminado})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización para eliminar el producto"})
    }
}

//Función para obtener todos los productos
function obtenerProductos(req, res){
    Producto.find({},{__v: 0},(err, productosObtenidos)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!productosObtenidos){
            return res.status(500).send({mensaje: "Error al obtener los productos"})
        }else{
            return res.status(200).send({Productos: productosObtenidos})
        }
    }).sort({precio:1})
}

//Función para la cantidad de productos
function cantidadProductos(req, res){
    Producto.find((err, productos)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!productos){
            return res.status(500).send({mensaje: "No se pudo obtener los productos"})
        }else{
            return res.status(200).send({Cantidad_De_Productos: productos})
        }
    }).count();
}

//Función para buscar Producto por id
function buscarProductoId(req, res){
    var idProducto = req.params.idProducto;

    Producto.findById(idProducto,{__v: 0},(err, productoEncontrado)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!productoEncontrado){
            return res.status(500).send({mensaje: "No se ha podido encontrar el producto"})
        }else{
            return res.status(200).send({Producto_Encontrado: productoEncontrado})
        }
    })
}

//Función para buscar producto por nombre
function buscarProductoNombre(req, res){
    var nombreProducto = req.params.nombreProducto;

    Producto.findOne({"nombre": {$regex: nombreProducto, $options: 'i'}},{__v: 0}, (err, productoEncontrado)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!productoEncontrado){
            return res.status(500).send({mensaje: "No se ha podido encontrar el producto"})
        }else{
            return res.status(200).send({Producto_Encontrado: productoEncontrado})
        }
    })
}

//Función para obtener productos por categoría
function productosCategoria(req, res){
    var idCategoria = req.params.idCategoria;

    Producto.find({"categoria": idCategoria},{__v: 0}, (err, productos)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(productos && productos.length >= 1){
            return res.status(200).send({Productos: productos})
        }else{
            return res.status(500).send({mensaje: "La categoría no tiene ningun producto"})
        }
    })
}

//Función para obtener el producto más vendido
async function obtenerProductoMasVendido(req, res){
    Producto.find({},{_id:0,__v:0}, (err, productos)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!productos){
            return res.status(500).send({mensaje: "No se han podido obtener el producto"})
        }else{
            return res.status(500).send({productos})
        }
    }).sort({cantidad_vendida: -1}).limit(5)
}

//Función para productos agotados
async function productosAgotados(req, res){
    await Producto.find({stock: 0}, (err, agotado)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(agotado.length === 0){
            return res.status(200).send({Producto_Agotado: agotado})
        }else{
            return res.status(200).send({mensaje: "No hay productos agotados"})
        }
    })
}

module.exports = {
    ejemploProducto,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    obtenerProductos,
    cantidadProductos,
    buscarProductoId,
    buscarProductoNombre,
    productosCategoria,
    obtenerProductoMasVendido,
    productosAgotados
}