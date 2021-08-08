const express = require("express");
const router = express.Router();
const { crearDetalleVenta, listDetalleVenta } = require("../controllers/DetalleVentaController");

router.get("/", listDetalleVenta);
router.post("/create", crearDetalleVenta);

module.exports = router;
