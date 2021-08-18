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
  const catExiste = await pool.query(sql.sameCategoria(), [nombre]);
  if (catExiste.length > 0) {
    return res.json({ message: "el dato existe", catExiste });
  }
  await pool.query(sql.insertCategoria(), [nuevaCategoria], (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json({ message: "Categoría añadido correctamente" });
    }
  });
};
exports.bajaCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await pool.query(sql.bajaCategoria(), [id]);
  if (categoria) {
    res.status(200).json({ message: "se dió de baja los datos correctamente" });
  }
  res.end();
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
  const active = 1;
  const { nombre, descripcion } = req.body;
  const nuevaCategoria = { nombre, descripcion, active };
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
