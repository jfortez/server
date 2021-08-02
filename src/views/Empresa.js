const express = require("express");
const router = express.Router();
const {
  listEmpresa,
  actualizarOdontologo,
  crearEmpresa,
} = require("../controllers/EmpresaController");

router.get("/", listEmpresa);
router.post("/create", crearEmpresa);
router.post("/update/:id", actualizarOdontologo);
module.exports = router;
