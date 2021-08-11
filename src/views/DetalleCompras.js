const express = require("express");
const router = express.Router();
const {
  crearDetalleCompras,
  listDetalleCompras,
  listDetalleComprasByIdCompras,
} = require("../controllers/DetalleCompraController");

router.get("/", listDetalleCompras);
router.get("/:id", listDetalleComprasByIdCompras);
router.post("/createDetalleCompras", crearDetalleCompras);
module.exports = router;
