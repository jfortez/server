const pool = require("../database");
const sql = require("../models/ProductoQueries");

exports.listProducto = async (req, res) => {
  await pool.query(sql.getProductos(), (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json(response);
    }
  });
  res.send();
};
exports.bajaProveedor = async (req, res) => {
  const { id } = req.params;
  const producto = await pool.query(sql.bajaProuctos(), [id]);
  if (producto) {
    res.status(200).json({ message: "se dió de baja los datos correctamente" });
  }
  res.end();
};
exports.getProductoById = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getProductoById(), [id], (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ message: "Producto no existe" });
    }
  });
};

exports.test = async (req, res) => {
  const { vDetalle } = req.body;
  const updateCant = await pool.query(sql.updateCantidad(), [vDetalle]);
  if (updateCant) {
    res.status(200).json({ message: "Datos Actualizados" });
  }
};

exports.updateByCompras = async (req, res) => {
  const { existente } = req.body;
  const updateValues = await pool.query(sql.updateByCompras(), [existente]);
  if (updateValues) {
    res.status(200).json({ message: "Datos Actualizados" });
  }
};

exports.multipleCreate = async (req, res) => {
  const { nuevoProducto } = req.body;
  const multiplesProductos = await pool.query(sql.multipleInsertProductos(), [nuevoProducto]);
  if (multiplesProductos) {
    res.status(200).json({ message: "Detalle Venta añadido correctamente" });
  }
};

exports.getProductoByCod = async (req, res) => {
  const { cod_producto } = req.body;
  await pool.query(sql.getProductoByCod(), [cod_producto], (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.json({ message: "Producto no existe" });
    }
  });
};

exports.crearProducto = async (req, res) => {
  const active = 1;
  const { cod_producto, nombre, descripcion, cantidad, costo, precio, id_categoria } = req.body;
  const nuevoProducto = {
    cod_producto,
    nombre,
    descripcion,
    cantidad,
    costo,
    precio,
    id_categoria,
    active,
  };
  const codExiste = await pool.query(sql.getProductoByCod(), [cod_producto]);
  if (codExiste.length > 0) {
    return res.json({ message: "el dato existe", codExiste });
  }
  await pool.query(sql.insertProductos(), [nuevoProducto], (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json({ message: "producto añadido correctamente" });
    }
  });
};

exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getProductoById(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.deleteProductos(), [id], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "Producto Eliminado correctamente" });
        }
      });
    } else {
      res.status(500).json({ message: "Producto no existe" });
    }
  });
};

exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const active = 1;
  const { cod_producto, nombre, descripcion, cantidad, costo, precio, id_categoria } = req.body;
  let nuevoProducto = {
    cod_producto,
    nombre,
    descripcion,
    cantidad,
    costo,
    precio,
    id_categoria,
    active,
  };
  if (active === undefined) {
    delete nuevoProducto.active;
  }
  await pool.query(sql.getProductoById(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.updateProductos(), [nuevoProducto, id], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "Producto Actualizada correctamente" });
        }
      });
    } else {
      res.status(500).json({ message: "Producto no existe" });
    }
  });
};
