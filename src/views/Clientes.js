const express = require("express");
const router = express.Router();
const {
  actualizarCliente,
  crearCliente,
  eliminarCliente,
  bajaCliente,
  getClienteById,
  listCliente,
  getClienteByRUC,
} = require("../controllers/ClienteController");

router.get("/", listCliente);
router.get("/:id", getClienteById);
router.post("/ruc", getClienteByRUC);
router.post("/create", crearCliente);
router.post("/baja/:id", bajaCliente);
router.delete("/delete/:id", eliminarCliente);
router.post("/update/:id", actualizarCliente);

module.exports = router;
