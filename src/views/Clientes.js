const express = require("express");
const router = express.Router();
const {
  actualizarCliente,
  crearCliente,
  eliminarCliente,
  getClienteById,
  listCliente,
} = require("../controllers/ClienteController");

router.get("/", listCliente);
router.get("/:id", getClienteById);
router.post("/create", crearCliente);
router.delete("/delete/:id", eliminarCliente);
router.post("/update/:id", actualizarCliente);

module.exports = router;
