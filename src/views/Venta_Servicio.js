const express = require("express");
const router = express.Router();
const {
  createVentaServicio,
  deleteVentas,
  listVentaServicios,
  updateVentaServicios,
} = require("../controllers/VentaServiciosController");

router.get("/", listVentaServicios);
router.post("/create", createVentaServicio);
router.post("/update/:id", updateVentaServicios);
router.delete("/delete/:id", deleteVentas);
module.exports = router;
