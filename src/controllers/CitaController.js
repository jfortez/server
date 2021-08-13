const pool = require("../database");
const sql = require("../models/CitaQueries");

exports.listCita = async (req, res) => {
  const cita = await pool.query(sql.getCita());
  if (cita.length > 0) {
    res.status(200).json(cita);
  }
  res.end();
};
exports.listCitaById = async (req, res) => {
  const { id } = req.params;
  const cita = await pool.query(sql.getCitaByIdAgenda(), [id]);
  if (cita.length > 0) {
    res.status(200).json(cita);
  }

  res.end();
};
exports.createCita = async (req, res) => {
  const { id_agenda, sintomas, id_receta, asistencia, observaciones } = req.body;
  const nuevo = { id_agenda, sintomas, id_receta, asistencia, observaciones };
  const cita = await pool.query(sql.insertCita(), [nuevo]);
  if (cita) {
    res.status(200).json({ message: "se ha ingresado los datos correctamente" });
  } else {
    res.status(400).json({ message: "hubo un error al ingresar los datos" });
  }
  res.end();
};
exports.updateCita = async (req, res) => {
  const { id } = req.params;
  const { sintomas, id_receta, asistencia, observaciones } = req.body;
  let update = { sintomas, id_receta, asistencia, observaciones };
  if (observaciones === undefined) {
    delete update.observaciones;
  }
  if (sintomas === undefined) {
    delete update.sintomas;
  }
  if (asistencia === undefined) {
    delete update.asistencia;
  }
  const cita = await pool.query(sql.updateCita(), [update, id]);
  if (cita) {
    res.status(200).json({ message: "Cita Actualizada correctamente" });
  }
  res.end();
};
