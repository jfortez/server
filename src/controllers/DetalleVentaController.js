const pool = require("../database");
const sql = require("../models/DetalleVenQueries");

exports.listDetalleVenta = async (req, res) => {
  await pool.query(sql.getDetalleVenta(), (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json({ response });
    }
  });
};

exports.crearDetalleVenta = async (req, res) => {
  const { ventaDetalle } = req.body;
  await pool.query(sql.insertDetalleVenta(), [ventaDetalle], (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json({ message: "Detalle Venta añadido correctamente" });
    }
  });
};
