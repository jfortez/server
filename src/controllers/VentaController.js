const pool = require("../database");
const sql = require("../models/VentaQueries");

exports.listVenta = async (req, res) => {
  await pool.query(sql.getVentas(), (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json({ response });
    }
  });
};

exports.getVentaById = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getVentasById(), [id], (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      res.status(200).json({ response });
    } else {
      res.status(500).json({ message: "Venta no existe" });
    }
  });
};

exports.crearVenta = async (req, res) => {
  const fecha = new Date();
  const { num_venta, cantidad, subtotal, total, id_Cliente } = req.body;
  const nuevaVenta = {
    num_venta,
    fecha,
    cantidad,
    subtotal,
    total,
    id_Cliente,
  };
  await pool.query(sql.insertCategoria(), [nuevaVenta], (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json({ message: "Venta añadido correctamente" });
    }
  });
};

exports.eliminarVenta = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getVentasById(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.deleteVentas(), [id], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "Venta Eliminado correctamente" });
        }
      });
    } else {
      res.status(500).json({ message: "Venta no existe" });
    }
  });
};

exports.actualizarVenta = async (req, res) => {
  const { id } = req.params;
  const fecha = new Date();
  const { num_venta, cantidad, subtotal, total, id_Cliente } = req.body;
  const nuevaVenta = {
    num_venta,
    fecha,
    cantidad,
    subtotal,
    total,
    id_Cliente,
  };
  await pool.query(sql.getVentasById(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(
        sql.updateVentas(),
        [nuevaVenta, id],
        (err, response) => {
          if (err) throw err;
          if (response) {
            res
              .status(200)
              .json({ message: "Venta Actualizada correctamente" });
          }
        }
      );
    } else {
      res.status(500).json({ message: "Venta no existe" });
    }
  });
};
