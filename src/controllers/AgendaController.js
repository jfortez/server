const pool = require("../database");
const sql = require("../models/AgendaQueries");

exports.listAgenda = async (req, res) => {
  const agenda = await pool.query(sql.getAgenda());
  if (agenda) {
    return res.status(200).json(agenda);
  }
  res.end();
};
exports.createAgenda = async (req, res) => {
  const fecha_registro = new Date();
  const estado = "PENDIENTE";
  const {
    descripcion,
    fechainicio_agenda,
    hora_agenda,
    fechafin_agenda,
    id_Odontologo,
    id_Paciente,
    id_Servicio,
  } = req.body;
  const nuevo = {
    descripcion,
    fechainicio_agenda,
    hora_agenda,
    fechafin_agenda,
    estado,
    id_Odontologo,
    id_Paciente,
    fecha_registro,
    id_Servicio,
  };
  const agenda = await pool.query(sql.insertAgenda(), [nuevo]);
  if (agenda) {
    return res.status(200).active({ message: "se ha ingresado los datos correctamente" });
  } else {
    res.status(400).json({ message: "hubo un error al ingresar los datos" });
  }
  res.end();
};
exports.updateAgenda = async (req, res) => {
  const { id } = req.params;
  const {
    descripcion,
    fechainicio_agenda,
    hora_agenda,
    fechafin_agenda,
    estado,
    id_Odontologo,
    id_Paciente,
    id_Servicio,
  } = req.body;
  const update = {
    descripcion,
    fechainicio_agenda,
    hora_agenda,
    fechafin_agenda,
    estado,
    id_Odontologo,
    id_Paciente,
    fecha_registro,
    id_Servicio,
  };
  const agenda = await pool.query(sql.updateAgenda(), [update, id]);
  if (agenda) {
    return res.status(200).active({ message: "se ha actualizado los datos correctamente" });
  }
  res.end();
};
exports.deleteAgenda = async (req, res) => {
  const { id } = req.params;
  const agenda = await pool.query(sql.deleteAgenda(), [id]);
  if (agenda) {
    return res.status(200).active({ message: "se ha eliminado los datos correctamente" });
  }
  res.end();
};