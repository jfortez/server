const express = require("express");
const router = express.Router();
const {
  listPacientes,
  crearPaciente,
  eliminarPaciente,
  actualizarPaciente,
  bajaPacientes,
  listPacientesById,
  listPacietnesByCedula,
} = require("../controllers/PacienteController");

router.get("/", listPacientes);
router.post("/paciente/ced", listPacietnesByCedula);
router.get("/paciente/:id", listPacientesById);
router.post("/create", crearPaciente);
router.post("/baja/:id", bajaPacientes);
router.delete("/delete/:id", eliminarPaciente);
router.post("/update/:id", actualizarPaciente);
module.exports = router;
