const pool = require("../database");
const sql = require("../models/ServiciosQueries");

exports.listServicios = async (req, res) => {
  const servicios = await pool.query(sql.getServicios());
  if (servicios) {
    res.status(200).json(servicios);
  }
  res.end();
};
exports.listServiciosById = async (req, res) => {
  const { id } = req.params;
  const servicios = await pool.query(sql.getServiciosById(), [id]);
  if (servicios.length > 0) res.status(200).json(servicios);
  res.end();
};
exports.listServiciosByCod = async (req, res) => {
  const { cod_servicio } = req.body;
  const servicios = await pool.query(sql.getServiciosByCodAndActive(), [cod_servicio]);
  if (servicios.length > 0) {
    res.status(200).json(servicios);
  } else {
    res.json({ message: "no existe Servicio" });
  }
  res.end();
};
exports.createServicio = async (req, res) => {
  const active = 1;
  const { cod_servicio, nombre, descripcion, precio } = req.body;
  const nuevo = { cod_servicio, nombre, descripcion, precio, active };
  const codExiste = await pool.query(sql.getServiciosByCod(), [cod_servicio]);
  if (codExiste.length > 0) {
    return res.json({ message: "el Servicio ya existe", codExiste });
  }
  const servicio = await pool.query(sql.insertServicios(), [nuevo]);
  if (servicio) {
    res.status(200).json({ message: "se ha ingresado los datos correctamente" });
  } else {
    res.status(400).json({ message: "hubo un error al ingresar los datos" });
  }
  res.end();
};
exports.updateServicios = async (req, res) => {
  const { id } = req.params;
  const active = 1;
  const { cod_servicio, nombre, descripcion, precio } = req.body;
  const update = { cod_servicio, nombre, descripcion, precio, active };
  const servicio = await pool.query(sql.updateServicios(), [update, id]);
  if (servicio) {
    res.status(200).json({ message: "Servicio Actualizada correctamente" });
  }
  res.end();
};
exports.bajaServicios = async (req, res) => {
  const { id } = req.params;
  const servicio = await pool.query(sql.downServicios(), [id]);
  if (servicio) {
    res.status(200).json({ message: "se dió de baja los datos correctamente" });
  }
  res.end();
};
