const express = require("express");
const router = express.Router();
const {
  actualizarOdontologo,
  crearOdontologo,
  eliminarOdontologo,
  getOdontologoById,
  listOdontologo,
  getOdontologoByCedula,
} = require("../controllers/OdontologosController");

router.get("/", listOdontologo);
router.post("/by/cedula", getOdontologoByCedula);
router.get("/:id", getOdontologoById);
router.post("/create", crearOdontologo);
router.delete("/delete/:id", eliminarOdontologo);
router.post("/update/:id", actualizarOdontologo);
module.exports = router;
