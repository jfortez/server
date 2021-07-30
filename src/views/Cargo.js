const express = require("express");
const router = express.Router();
const {
  actualizarCargo,
  crearCargo,
  eliminarCargo,
  getCargoById,
  listCargo,
} = require("../controllers/CargoController");
router.get("/", listCargo);
router.get("/:id", getCargoById);
router.post("/create", crearCargo);
router.delete("/delete/:id", eliminarCargo);
router.post("/update/:id", actualizarCargo);
module.exports = router;
