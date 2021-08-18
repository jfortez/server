const express = require("express");
const router = express.Router();
const {
  addMovimientosCaja,
  listMovimientosCajaByIdCaja,
  listMovimientosCaja,
  updateMovimientoCaja,
} = require("../controllers/MovimientosCajaController");

router.get("/", listMovimientosCaja);
router.get("/:id", listMovimientosCajaByIdCaja);
router.post("/create", addMovimientosCaja);
router.post("/update/:id", updateMovimientoCaja);
module.exports = router;
