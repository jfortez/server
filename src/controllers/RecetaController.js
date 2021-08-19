const pool = require("../database");
const sql = require("../models/RecetaQueries");

exports.listReceta = async (req, res) => {
  const receta = await pool.query(sql.getReceta());
  if (receta) {
    res.status(200).json(receta);
  }
  res.end();
};
exports.listRecetaByIdAgenda = async (req, res) => {
  const { id } = req.params;
  const receta = await pool.query(sql.getReceta(), [id]);
  if (receta) {
    res.status(200).json(receta);
  }
  res.end();
};
exports.creatReceta = async (req, res) => {
  const active = 1;
  const { id_agenda, nombre, descripcion } = req.body;
  const nuevo = { id_agenda, nombre, descripcion, active };
  const receta = await pool.query(sql.insertReceta(), [nuevo]);
  if (receta) {
    res.status(200).json({ message: "se ha ingresado los datos correctamente" });
  } else {
    res.status(400).json({ message: "hubo un error al ingresar los datos" });
  }
  res.end();
};
exports.updateReceta = async (req, res) => {
  const { id } = req.params;
  const { id_agenda, nombre, descripcion } = req.body;
  const update = { id_agenda, nombre, descripcion };
  const receta = await pool.query(sql.updateReceta(), [update, id]);
  if (receta) {
    res.status(200).json({ message: "Receta Actualizada correctamente" });
  }
  res.end();
};
exports.bajaReceta = async (req, res) => {
  const { id } = req.params;
  const receta = await pool.query(sql.downReceta(), [update, id]);
  if (receta) {
    res.status(200).json({ message: "se dió de baja los datos correctamente" });
  }
  res.end();
};
