const pool = require("../database");
const sql = require("../models/OdontologoQueries");

exports.listOdontologo = async (req, res) => {
  await pool.query(sql.getOdontologos(), (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json(response);
    }
  });
};

exports.getOdontologoById = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getOdontologosById(), [id], (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "el item no existe" });
    }
  });
};

exports.crearOdontologo = async (req, res) => {
  const fecha_registro = new Date().toLocaleDateString();
  const active = 1;
  const {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    id_Usuario,
  } = req.body;
  const nuevoOdontologo = {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    fecha_registro,
    active,
    id_Usuario,
  };
  await pool.query(sql.ifOdontologoExists(), [cedula], async (err, response) => {
    if (err) throw err;
    if (response.lenght > 0) {
      res.status(400).json({ message: "el item ya existe, no se puede duplicar" });
    } else {
      await pool.query(sql.insertOdontologos(), [nuevoOdontologo], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "item creado correctamente" });
        }
      });
    }
  });
};

exports.eliminarOdontologo = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getOdontologosById(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.deleteOdontologos(), [id], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "item Eliminado correctamente" });
        }
      });
    } else {
      res.status(400).json({ message: "el item no existe" });
    }
  });
};

exports.actualizarOdontologo = async (req, res) => {
  const { id } = req.params;
  const fecha_registro = new Date().toLocaleDateString();
  const {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    active,
    id_Usuario,
  } = req.body;
  const nuevoOdontologo = {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    fecha_registro,
    active,
    id_Usuario,
  };
  await pool.query(sql.getOdontologosById(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.updateOdontologos(), [nuevoOdontologo, id], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "item Actualizado correctamente" });
        }
      });
    } else {
      res.status(400).json({ message: "el item no existe" });
    }
  });
};
