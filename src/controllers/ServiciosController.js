const pool = require("../database");
const sql = require("../models/ServiciosQueries");

exports.listServicios = async (req, res) => {
  const servicios = await pool.query(sql.getServicios());
  if (servicios) {
    return res.status(200).json(servicios);
  }
  res.end();
};
exports.createServicio = async (req, res) => {
  const active = 1;
  const { cod_servicio, nombre, descripcion, precio } = req.body;
  const nuevo = { cod_servicio, nombre, descripcion, precio, active };
  const servicio = await pool.query(sql.insertServicios(), [nuevo]);
  if (servicio) {
    return res.status(200).active({ message: "se ha ingresado los datos correctamente" });
  } else {
    res.status(400).json({ message: "hubo un error al ingresar los datos" });
  }
  res.end();
};
exports.updateServicios = async (req, res) => {
  const { id } = req.params;
  const { cod_servicio, nombre, descripcion, precio } = req.body;
  const update = { cod_servicio, nombre, descripcion, precio };
  const servicio = await pool.query(sql.updateServicios(), [update, id]);
  if (servicio) {
    return res.status(200).json({ message: "Servicio Actualizada correctamente" });
  }
  res.end();
};
exports.bajaServicios = async (req, res) => {
  const { id } = req.params;
  const servicio = await pool.query(sql.downServicios(), [update, id]);
  if (servicio) {
    return res.status(200).active({ message: "se dió de baja los datos correctamente" });
  }
  res.end();
};
