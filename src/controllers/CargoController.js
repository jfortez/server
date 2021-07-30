const pool = require("../database");
const sql = require("../models/CargoQueries");

exports.listCargo = async (req, res) => {
  await pool.query(sql.getCargo(), (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json(response);
    }
  });
};

exports.getCargoById = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getCargoById(), [id], (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ message: "Producto no existe" });
    }
  });
};

exports.crearCargo = async (req, res) => {
  const { nombre } = req.body;
  const nuevoCargo = {
    nombre,
  };
  await pool.query(sql.ifCargoExists(), [nombre], async (err, response) => {
    if (err) throw err;
    if (response.lenght > 0) {
      res.status(400).json({ message: "el item ya existe, no se puede duplicar" });
    } else {
      await pool.query(sql.insertCargo(), [nuevoCargo], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "item creado correctamente" });
        }
      });
    }
  });
};

exports.eliminarCargo = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getCargoById(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.deleteCargo(), [id], (err, response) => {
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

exports.actualizarCargo = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const nuevoCargo = {
    nombre,
  };
  await pool.query(sql.updateCargo(), [nuevoCargo, id], (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json({ message: "item Actualizado correctamente" });
    }
  });
};
