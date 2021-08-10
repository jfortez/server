const express = require("express");
const router = express.Router();
const {
  addMovimientosCaja,
  listMovimientosCaja,
  updateMovimientoCaja,
} = require("../controllers/MovimientosCajaController");

router.get("/", listMovimientosCaja);
router.post("/create", addMovimientosCaja);
router.post("/update/:id", updateMovimientoCaja);
module.exports = router;
