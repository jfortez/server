const express = require("express");
const router = express.Router();
const {
  actualizarPersonal,
  crearPersonal,
  eliminarPersonal,
  getPersonalById,
  listPersonal,
  getPersonalByCedula,
  listPersonalCedula,
  setUser,
} = require("../controllers/PersonalController");

router.get("/", listPersonal);
router.get("/cedula", listPersonalCedula);
router.get("/:id", getPersonalById);
router.post("/by/cedula", getPersonalByCedula);
router.post("/create", crearPersonal);
router.post("/setUser", setUser);
router.delete("/delete/:id", eliminarPersonal);
router.post("/update/:id", actualizarPersonal);

module.exports = router;
