const pool = require("../database");
const sql = require("../models/FacturacionServQueries");

exports.listFacturacionServicios = async (req, res) => {
  const facturacion_servicio = await pool.query(sql.getDetalleVenta(), (err, response));
  if (facturacion_servicio.length > 0) {
    return res.status(200).json(facturacion_servicio);
  }
  res.end();
};

exports.crearFacturacionServicios = async (req, res) => {
  const { facturacionServicio } = req.body;
  const facturacionServicioNuevo = await pool.query(sql.insertDetalleVenta(), [
    facturacionServicio,
  ]);
  if (facturacionServicioNuevo) {
    return res.status(200).json({ message: "se ha añadido los datos correctamente" });
  }
  res.end();
};
