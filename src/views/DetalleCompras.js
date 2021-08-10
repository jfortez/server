const express = require("express");
const router = express.Router();
const {
  crearDetalleCompras,
  listDetalleCompras,
} = require("../controllers/DetalleCompraController");

router.get("/", listDetalleCompras);
router.post("/createDetalleCompras", crearDetalleCompras);
module.exports = router;
