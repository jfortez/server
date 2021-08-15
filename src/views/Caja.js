const express = require("express");
const router = express.Router();
const {
  createCaja,
  listCaja,
  updateCaja,
  cerrarCaja,
  listCajaByMaxId,
} = require("../controllers/CajaController");

router.get("/", listCaja);
router.get("/max", listCajaByMaxId);
router.post("/create", createCaja);
router.post("/cierrecaja", cerrarCaja);
router.post("/update/:id", updateCaja);
module.exports = router;
