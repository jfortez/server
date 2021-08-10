const express = require("express");
const router = express.Router();
const {
  listProveedores,
  bajaProveedor,
  createProveedor,
  eliminarProveedor,
  updateProveedor,
} = require("../controllers/ProveedoresController");

router.get("/", listProveedores);
router.post("/create", createProveedor);
router.post("/update/:id", updateProveedor);
router.post("/bajaProveedor/:id", bajaProveedor);
router.delete("/delete/:id", eliminarProveedor);
module.exports = router;
