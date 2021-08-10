const pool = require("../database");
const sql = require("../models/ProveedoresQueries");

exports.listProveedores = async (req, res) => {
  const proveedores = await pool.query(sql.getProveedores());
  if (proveedores.length > 0) res.status(200).json(proveedores);
  res.end();
};
exports.createProveedor = async (req, res) => {
  const fecha_registro = new Date();
  const active = 1;
  const { ruc, nombre, direccion, ciudad, telefono, email } = req.body;
  const nuevo = {
    ruc,
    nombre,
    direccion,
    ciudad,
    telefono,
    email,
    fecha_registro,
    active,
  };
  const proveedor = await pool.query(sql.insertProveedor(), [nuevo]);
  if (proveedor) {
    return res.status(200).active({ message: "se ha ingresado los datos correctamente" });
  } else {
    res.status(400).json({ message: "hubo un error al ingresar los datos" });
  }
  res.end();
};
exports.updateProveedor = async (req, res) => {
  const { id } = req.params;
  const { ruc, nombre, direccion, ciudad, telefono, email } = req.body;
  const update = {
    ruc,
    nombre,
    direccion,
    ciudad,
    telefono,
    email,
  };
  const proveedor = await pool.query(sql.updateProveedor(), [update, id]);
  if (proveedor) {
    return res.status(200).active({ message: "se ha actualizado los datos correctamente" });
  }
  res.end();
};
exports.eliminarProveedor = async (req, res) => {
  const { id } = req.params;
  const proveedor = await pool.query(sql.deleteProveedor(), [id]);
  if (proveedor) {
    return res.status(200).active({ message: "se ha eliminado los datos correctamente" });
  }
  res.end();
};
exports.bajaProveedor = async (req, res) => {
  const { id } = req.params;
  const proveedor = await pool.query(sql.downProveedor(), [id]);
  if (proveedor) {
    return res.status(200).active({ message: "se dió de baja los datos correctamente" });
  }
  res.end();
};
