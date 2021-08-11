const pool = require("../database");
const sql = require("../models/ComprasQueries");

exports.listCompras = async (req, res) => {
  const compras = await pool.query(sql.getCompras());
  if (compras.length > 0) {
    res.status(200).json(compras);
  }
  res.end();
};
exports.createCompras = async (req, res) => {
  const active = 1;
  const { id_proveedor, num_factura, fecha, cantidad, total } = req.body;
  const nuevo = { id_proveedor, num_factura, fecha, cantidad, total, active };
  const nuevaCompras = await pool.query(sql.insertCompras(), [nuevo]);
  if (nuevaCompras) {
    const id = nuevaCompras.insertId;
    res.status(200).json(id);
  } else {
    res.status(400).json({ message: "hubo un error al ingresar los datos" });
  }
  res.end();
};
exports.updateCompras = async (req, res) => {
  const { id } = req.params;
  const { id_proveedor, num_factura, fecha, cantidad, total } = req.body;
  const update = { id_proveedor, num_factura, fecha, cantidad, total, active };
  const updateCompras = await pool.query(sql.updateCompras(), [update, id]);
  if (updateCompras) {
    res.status(200).json({ message: "Compra Actualizada correctamente" });
  }
  res.end();
};
exports.downCompras = async (req, res) => {
  const { id } = req.params;
  const baja = await pool.query(sql.bajaCompras(), [id]);
  if (baja) {
    res.status(200).json({ message: "Se dió de baja el item correctamente" });
  }
  res.end();
};
