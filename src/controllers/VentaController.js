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
  const { num_venta, cantidad, subtotal, total, importe, devolucion, id_Cliente, id_Usuario } =
    req.body;
  const nuevaVenta = {
    num_venta,
    fecha,
    cantidad,
    subtotal,
    total,
    importe,
    devolucion,
    id_Cliente,
    id_Usuario,
  };
  await pool.query(sql.insertVentas(), [nuevaVenta], (err, response) => {
    if (err) throw err;
    if (response) {
      const id = response.insertId;
      res.status(200).json(id);
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
  const { num_venta, cantidad, subtotal, total, importe, devolucion, id_Cliente, id_Usuario } =
    req.body;
  const nuevaVenta = {
    num_venta,
    fecha,
    cantidad,
    subtotal,
    total,
    importe,
    devolucion,
    id_Cliente,
    id_Usuario,
  };
  await pool.query(sql.getVentasById(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.updateVentas(), [nuevaVenta, id], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "Venta Actualizada correctamente" });
        }
      });
    } else {
      res.status(500).json({ message: "Venta no existe" });
    }
  });
};
// ----_Reporte de Ventas

exports.listReporteVentas = async (req, res) => {
  const reporteVentas = await pool.query(sql.getReporteVentas());
  if (reporteVentas.length > 0) {
    res.status(200).json(reporteVentas);
  }
  res.end();
};
exports.listReporteDetalleVentas = async (req, res) => {
  const { id } = req.params;
  const reporteDetVenta = await pool.query(sql.getreporteDetalleVentas(), [id]);
  if (reporteDetVenta.length > 0) {
    res.status(200).json(reporteDetVenta);
  }
  res.end();
};
