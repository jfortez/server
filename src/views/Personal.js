const express = require("express");
const router = express.Router();
const {
  actualizarPersonal,
  crearPersonal,
  eliminarPersonal,
  getPersonalById,
  listPersonal,
} = require("../controllers/PersonalController");

router.get("/", listPersonal);
router.get("/:id", getPersonalById);
router.post("/create", crearPersonal);
router.delete("/delete/:id", eliminarPersonal);
router.post("/update/:id", actualizarPersonal);

module.exports = router;
