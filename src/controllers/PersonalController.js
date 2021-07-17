const pool = require("../database");
const sql = require("../models/PersonalQueries");

exports.getPersonal = (req, res) => {
  try {
    pool.query(sql.getPersonal(), (error, results) => {
      if (error) throw error;
      if (results) {
        return res.status(200).json({ message: "Success", results });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.createPersonal = (req, res) => {
  const fecha_registro = new Date().toLocaleDateString();
  const active = 1;
  const {
    nombres,
    apellidos,
    telefono,
    direccion,
    ciudad,
    email,
    fecha_nac,
    edad,
    tipo_doc,
    num_documento,
    id_Usuario,
  } = req.body;
  const nuevoPersonal = {
    nombres,
    apellidos,
    telefono,
    direccion,
    ciudad,
    email,
    fecha_nac,
    edad,
    tipo_doc,
    num_documento,
    active,
    fecha_registro,
    id_Usuario,
  };
  try {
    pool.query(sql.insertPersonal(), [nuevoPersonal], (error, results) => {
      if (error) throw error;
      if (results) {
        res.status(200).json({ message: "Success", results });
      } else {
        res
          .status(400)
          .json({ message: "something has wrong during the operation" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
