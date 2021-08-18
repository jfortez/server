const pool = require("../database");
const sql = require("../models/CajaQueries");

exports.listCaja = async (req, res) => {
  const caja = await pool.query(sql.getCaja());
  if (caja) {
    res.status(200).json(caja);
  }
  res.end();
};
exports.listCajaByMaxId = async (req, res) => {
  const caja = await pool.query(sql.getCajaByLastId());
  if (caja) {
    res.status(200).json(caja);
  }
  res.end();
};
exports.createCaja = async (req, res) => {
  const fecha = new Date();
  const estado_caja = "ABIERTO";
  const { caja_inicio, caja_actual, id_Usuario } = req.body;
  const nuevo = { fecha, caja_inicio, caja_actual, estado_caja, id_Usuario };
  const cajaNuevo = await pool.query(sql.createCaja(), [nuevo]);
  if (cajaNuevo) {
    res.status(200).json({ message: "se ha ingresado los datos correctamente" });
  } else {
    res.status(400).json({ message: "hubo un error al ingresar los datos" });
  }
  res.end();
};
exports.updateCaja = async (req, res) => {
  const { id } = req.params;
  const { caja_inicio, caja_actual } = req.body;
  let update = {
    caja_inicio,
    caja_actual,
  };
  if (caja_inicio === undefined) {
    delete update.caja_inicio;
  }
  if (caja_actual === undefined) {
    delete update.caja_actual;
  }
  const cajaUpdate = await pool.query(sql.updateCaja(), [update, id]);
  if (cajaUpdate) {
    res.status(200).json({ message: "caja Actualizada correctamente" });
  }
  res.end();
};
exports.cerrarCaja = async (req, res) => {
  estado_caja = "CERRADO";
  fecha_cierre = new Date();
  const { caja_cierre } = req.body;
  // const lastId = await pool.query(sql.getCajaByLastId());
  let cierre = { caja_cierre, fecha_cierre, estado_caja };
  const cierreCaja = await pool.query(sql.cerrarCajaActual(), [cierre]);
  if (cierreCaja) {
    res.status(200).json({ message: "Caja Cerrada" });
  }
  res.end();
};
