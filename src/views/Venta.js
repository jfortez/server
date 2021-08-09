const express = require("express");
const router = express.Router();
const {
  actualizarVenta,
  crearVenta,
  eliminarVenta,
  getVentaById,
  listVenta,
  listReporteVentas,
  listReporteDetalleVentas,
} = require("../controllers/VentaController");

router.get("/", listVenta);
router.get("/reporteVentas", listReporteVentas);
router.get("/reporteDetalleVenta/:id", listReporteDetalleVentas);
router.get("/venta/:id", getVentaById);
router.post("/create", crearVenta);
router.delete("/delete/:id", eliminarVenta);
router.post("/update/:id", actualizarVenta);
module.exports = router;
