const express = require("express");
const router = express.Router();
const {
  crearFacturacionServicios,
  listFacturacionServicios,
} = require("../controllers/FacturacionServController");

router.get("/", listFacturacionServicios);
router.post("/create", crearFacturacionServicios);
module.exports = router;
