const pool = require("../database");
const sql = require("../models/CategoriaQueries");

exports.listCategoria = async (req, res) => {
  const categorias = await pool.query(sql.getCategoria());
  if (categorias) {
    res.status(200).json(categorias);
  }
};

exports.getCategoriaById = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getCategoriabyId(), [id], (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ message: "Categoria no existe" });
    }
  });
};

exports.crearCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;
  const nuevaCategoria = { nombre, descripcion };
  await pool.query(sql.insertCategoria(), [nuevaCategoria], (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json({ message: "Categoría añadido correctamente" });
    }
  });
};

exports.eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getCategoriabyId(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.deleteCategoria(), [id], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "Categoria Eliminado correctamente" });
        }
      });
    } else {
      res.status(500).json({ message: "Categoria no existe" });
    }
  });
};

exports.actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  const nuevaCategoria = { nombre, descripcion };
  await pool.query(sql.getCategoriabyId(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.updateCategoria(), [nuevaCategoria, id], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "Categoria Actualizada correctamente" });
        }
      });
    } else {
      res.status(500).json({ message: "Categoria no existe" });
    }
  });
};
