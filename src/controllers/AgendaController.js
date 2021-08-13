const pool = require("../database");
const sql = require("../models/AgendaQueries");

exports.listAgenda = async (req, res) => {
  const agenda = await pool.query(sql.getAgendawDetalles());
  if (agenda) {
    res.status(200).json(agenda);
  }
  res.end();
};
exports.listAgendaByOdontologo = async (req, res) => {
  const { id } = req.params;
  const agenda = await pool.query(sql.getAgendawDetallesByOdontologo(), [id]);
  if (agenda) {
    res.status(200).json(agenda);
  }
  res.end();
};
exports.listAgendaByID = async (req, res) => {
  const { id } = req.params;
  const agenda = await pool.query(sql.getAgendawDetallesById(), [id]);
  if (agenda) {
    res.status(200).json(agenda);
  }
  res.end();
};
exports.createAgenda = async (req, res) => {
  const fecha_registro = new Date();
  const active = 1;
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
    active,
  };
  const cola_agenda = await pool.query(sql.getColaAgenda(), [id_Odontologo]);
  const hora = nuevo.hora_agenda + ":00";
  for (const key in cola_agenda) {
    const fecha = new Date(cola_agenda[key].fechainicio_cola).toISOString().split("T")[0];
    if (fecha === nuevo.fechainicio_agenda && cola_agenda[key].horainicio_cola === hora) {
      return res.json({ message: "Agenda Duplicado" });
    }
  }
  const agenda = await pool.query(sql.insertAgenda(), [nuevo]);
  const id = agenda.insertId;
  if (agenda) {
    res.status(200).json(id);
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
    res.status(200).json({ message: "se ha actualizado los datos correctamente" });
  }
  res.end();
};
exports.deleteAgenda = async (req, res) => {
  const { id } = req.params;
  const agenda = await pool.query(sql.deleteAgenda(), [id]);
  if (agenda) {
    res.status(200).json({ message: "se ha eliminado los datos correctamente" });
  }
  res.end();
};
exports.estadoAgenda = async (req, res) => {
  const { id } = req.params;
  const { estadoAgenda, colaAgenda } = req.body;
  const agenda = await pool.query(sql.modificarEstadoAgenda(), [estadoAgenda, colaAgenda, id]);
  if (agenda) {
    res.status(200).json({ message: "se ha anulado la agenda" });
  }
  res.end();
};
