const express = require("express");
const router = express.Router();
const {
  actualizarOdontologo,
  crearOdontologo,
  eliminarOdontologo,
  getOdontologoById,
  listOdontologo,
  getOdontologoByCedula,
  pruebaActualizar,
  pruebaById,
  pruebaCrear,
  pruebaEliminar,
} = require("../controllers/OdontologosController");

router.get("/", listOdontologo);
router.post("/by/cedula", getOdontologoByCedula);
router.get("/:id", getOdontologoById);
router.post("/create", crearOdontologo);
router.delete("/delete/:id", eliminarOdontologo);
router.post("/update/:id", actualizarOdontologo);
router.post("/prueba", pruebaCrear);
router.get("/prueba/:id", pruebaById);
router.post("/pruebaactualizar/:id", pruebaActualizar);
router.delete("/pruebaEliminar/:id", pruebaEliminar);
module.exports = router;
