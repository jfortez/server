const pool = require("../database");
const sql = require("../models/PersonasQueries");

exports.getCedulas = async (req, res) => {
  const cedulas = await pool.query(sql.getCiPersonas());
  if (cedulas.length > 0) {
    res.status(200).json(cedulas);
  } else {
    res.json({ message: "no existen datos" });
  }
};

exports.getOdontolgosByCedula = async (req, res) => {
  const { cedula } = req.body;
  const Ocedula = await pool.query(sql.getOdontologoRowByCedula(), [cedula]);
  if (Ocedula.length > 0) {
    res.status(200).json(Ocedula);
  }
};

exports.getPersonalByCedula = async (req, res) => {
  const { cedula } = req.body;
  const Pcedula = await pool.query(sql.getPersonalRowByCedula(), [cedula]);
  if (Pcedula.length > 0) {
    res.status(200).json(Pcedula);
  }
};
