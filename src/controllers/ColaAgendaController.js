const pool = require("../database");
const sql = require("../models/ColaAgendaQueries");

exports.listCola_Agenda = async (req, res) => {
  const colaAgenda = await pool.query(sql.getColaAgenda());
  if (colaAgenda) {
    res.status(200).json(colaAgenda);
  }
  res.end();
};
exports.createCola_Agenda = async (req, res) => {
  const fecha_registro = new Date();

  const estado = "PENDIENTE";
  const { fechainicio_cola, horainicio_cola, id_agenda } = req.body;
  const nuevo = {
    fechainicio_cola,
    horainicio_cola,
    estado,
    fecha_registro,
    id_agenda,
  };
  const colaAgenda = await pool.query(sql.insertColaAgenda(), [nuevo]);
  if (colaAgenda) {
    res.status(200).json({ message: "se ha ingresado los datos correctamente" });
  } else {
    res.status(400).json({ message: "hubo un error al ingresar los datos" });
  }
  res.end();
};
