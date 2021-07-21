const express = require("express");
const router = express.Router();
const {
  listPacientes,
  crearPaciente,
  eliminarPaciente,
  actualizarPaciente,
  listPacientesById,
} = require("../controllers/PacienteController");

router.get("/", listPacientes);
router.get("/paciente/:id", listPacientesById);
router.post("/create", crearPaciente);
router.delete("/delete/:id", eliminarPaciente);
router.post("/update/:id", actualizarPaciente);
module.exports = router;
