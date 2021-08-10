const pool = require("../database");
const sql = require("../models/VentaServicioQueries");

exports.listVentaServicios = async (req, res) => {
  const venta_servicios = await pool.query(sql.getVentaServicios());
  if (venta_servicios) {
    return res.status(200).json(venta_servicios);
  }
  res.end();
};
exports.createVentaServicio = async (req, res) => {
  const { num_venta, fecha, id_Agenda, importe, devolucion, id_Cliente, id_Usuario } = req.body;
  const nuevo = { num_venta, fecha, id_Agenda, importe, devolucion, id_Cliente, id_Usuario };
  const venta_servicio = await pool.query(sql.insertVentaServicios(), [nuevo]);
  if (venta_servicio) {
    return res.status(200).active({ message: "se ha ingresado los datos correctamente" });
  } else {
    res.status(400).json({ message: "hubo un error al ingresar los datos" });
  }
  res.end();
};
exports.updateVentaServicios = async (req, res) => {
  const { id } = req.params;
  const { num_venta, fecha, id_Agenda, importe, devolucion } = req.body;
  const update = { num_venta, fecha, id_Agenda, importe, devolucion };
  const venta_servicio = await pool.query(sql.updateVentaServicios(), [update, id]);
  if (venta_servicio) {
    return res.status(200).json({ message: "Venta de Servicios Actualizada correctamente" });
  }
  res.end();
};
exports.deleteVentas = async (req, res) => {
  const { id } = req.params;
  const venta_servicio = await pool.query(sql.deleteVentaServicios(), [id]);
  if (venta_servicio) {
    return res.status(200).active({ message: "se ha eliminado los datos correctamente" });
  }
  res.end();
};
