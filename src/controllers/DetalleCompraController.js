const pool = require("../database");
const sql = require("../models/DetalleCompQueries");

exports.listDetalleCompras = async (req, res) => {
  const comprasDetalle = await pool.query(sql.getDetalleCompras());
  if (comprasDetalle.length > 0) {
    return res.status(200).json(comprasDetalle);
  }
  res.end();
};
exports.listDetalleComprasByIdCompras = async (req, res) => {
  const { id } = req.params;
  const comprasDetalle = await pool.query(sql.getDetalleComprasbyIdCompra(), [id]);
  if (comprasDetalle.length > 0) {
    return res.status(200).json(comprasDetalle);
  }
  res.end();
};
exports.crearDetalleCompras = async (req, res) => {
  const { dtlleCompra } = req.body;
  const detalleCompra = await pool.query(sql.insertDetalleCompras(), [dtlleCompra]);
  if (detalleCompra) {
    return res.status(200).json({ message: "se ha añadido los datos correctamente" });
  }
  res.end();
};
