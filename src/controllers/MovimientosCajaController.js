const pool = require("../database");
const sql = require("../models/MovimientosCajaQueries");

exports.listMovimientosCaja = async (req, res) => {
  const movimientos_caja = await pool.query(sql.getMovimientosCaja());
  if (movimientos_caja.length > 0) {
    res.status(200).json(movimientos_caja);
  }
  res.end();
};
exports.listMovimientosCajaByIdCaja = async (req, res) => {
  const { id } = req.params;
  const movimientos_caja = await pool.query(sql.getMovimientosCajaById(), [id]);
  if (movimientos_caja.length > 0) {
    res.status(200).json(movimientos_caja);
  }
  res.end();
};
exports.addMovimientosCaja = async (req, res) => {
  const fechaMovimiento = new Date();
  const {
    id_caja,
    ingreso,
    egreso,
    descripcion,
    caja_actual,
    id_Usuario,
    id_venta,
    id_venta_servicio,
  } = req.body;
  const nuevo = {
    id_caja,
    ingreso,
    egreso,
    descripcion,
    fechaMovimiento,
    caja_actual,
    id_Usuario,
    id_venta,
    id_venta_servicio,
  };
  if (ingreso === undefined) {
    delete nuevo.ingreso;
  }
  if (egreso === undefined) {
    delete nuevo.egreso;
  }
  if (id_venta === undefined) {
    delete nuevo.id_venta;
  }
  if (id_venta_servicio === undefined) {
    delete nuevo.id_venta_servicio;
  }
  const movimientos_caja = await pool.query(sql.createMovimientosCaja(), [nuevo]);
  if (movimientos_caja) {
    res.status(200).json({ message: "se ha ingresado los datos correctamente" });
  } else {
    res.status(400).json({ message: "hubo un error al ingresar los datos" });
  }
  res.end();
};
exports.updateMovimientoCaja = async (req, res) => {
  const fechaMovimiento = new Date();
  const { id } = req.params;
  const { id_caja, ingreso, egreso, descripcion } = req.body;
  const update = { id_caja, ingreso, egreso, descripcion, fechaMovimiento };
  if (ingreso === undefined) {
    delete update.ingreso;
  }
  if (egreso === undefined) {
    delete update.egreso;
  }
  const movimientos_caja = await pool.query(sql.updateMovimientoCaja(), [update, id]);
  if (movimientos_caja) {
    res.status(200).json({ message: "Movimientos Actualizada correctamente" });
  }
  res.end();
};
