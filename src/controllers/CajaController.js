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
  console.log(req.body);

  // const fecha = new Date();
  // const estado_caja = "ABIERTO";
  // const { caja_inicio, id_Usuario } = req.body;
  // const nuevo = { fecha, caja_inicio, estado_caja, id_Usuario };
  // const cajaNuevo = await pool.query(sql.createCaja(), [nuevo]);
  // if (cajaNuevo) {
  //   res.status(200).active({ message: "se ha ingresado los datos correctamente" });
  // } else {
  //   res.status(400).json({ message: "hubo un error al ingresar los datos" });
  // }
  // res.end();
};
exports.updateCaja = async (req, res) => {
  const { id } = req.params;
  const { fecha, caja, cierre_caja, fecha_cierre, id_Usuario } = req.body;
  let update = { fecha, caja, cierre_caja, fecha_cierre, id_Usuario };
  if (cierre_caja === undefined) {
    delete update.cierre_caja;
  }
  if (fecha_cierre === undefined) {
    delete update.fecha_cierre;
  }
  const cajaUpdate = await pool.query(sql.updateCaja(), [update, id]);
  if (cajaUpdate) {
    res.status(200).json({ message: "caja Actualizada correctamente" });
  }
  res.end();
};
exports.cerrarCaja = () => async (req, res) => {
  console.log(req.body);
  // estado_caja = "CERRADO";
  // fecha_cierre = new Date();
  // const { cierre_caja } = req.body;
  // const lastId = await pool.query(sql.getCajaByLastId());
  // let cierre = { cierre_caja, fecha_cierre, estado_caja };
  // const cierreCaja = await pool.query(sql.cerrarCajaActual(), [cierre, lastId]);
  // if (cierreCaja) {
  //   res.status(200).json({ message: "Caja Cerrada" });
  // }
  // res.end();
};
