const pool = require("../database");
const sql = require("../models/EmpresaQueries");

exports.listEmpresa = async (req, res) => {
  await pool.query(sql.getEmpresa(), (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json(response);
    }
  });
};

exports.crearEmpresa = async (req, res) => {
  const { ruc, nombre, direccion, direccion2, ciudad, telefono } = req.body;
  const nuevaEmpresa = {
    ruc,
    nombre,
    direccion,
    direccion2,
    ciudad,
    telefono,
  };
  await pool.query(sql.insertEmpresa(), [nuevaEmpresa], (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json({ message: "item creado correctamente" });
    }
  });
};

exports.actualizarOdontologo = async (req, res) => {
  const { id } = req.params;
  const { ruc, nombre, direccion, direccion2, ciudad, telefono } = req.body;
  const nuevaEmpresa = {
    ruc,
    nombre,
    direccion,
    direccion2,
    ciudad,
    telefono,
  };
  await pool.query(sql.updateEmpresa(), [nuevaEmpresa, id], (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json({ message: "item Actualizado correctamente" });
    }
  });
};
