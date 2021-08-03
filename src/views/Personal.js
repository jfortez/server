const express = require("express");
const router = express.Router();
const {
  // actualizarPersonal,
  // crearPersonal,
  // eliminarPersonal,
  // listPersonal,
  // getPersonalByCedula,
  // listPersonalCedula,
  getPersonal,
  getPersonalById,
  pruebaCrear,
  pruebaActualizar,
  pruebaEliminar,
  setUser,
} = require("../controllers/PersonalController");

// router.get("/", listPersonal);
// router.get("/cedula", listPersonalCedula);
// router.post("/by/cedula", getPersonalByCedula);
// router.delete("/delete/:id", eliminarPersonal);
// router.post("/update/:id", actualizarPersonal);
// router.post("/create", crearPersonal);
router.get("/", getPersonal);
router.get("/:id", getPersonalById);
router.post("/setUser", setUser);
router.post("/create", pruebaCrear);
router.post("/update/:id", pruebaActualizar);
router.delete("/delete/:id", pruebaEliminar);

module.exports = router;
