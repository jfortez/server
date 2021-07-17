const express = require("express");
const router = express.Router();
const {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  getProductoById,
  listProducto,
} = require("../controllers/ProductoController");

router.get("/", listProducto);
router.get("/:id", getProductoById);
router.post("/create", crearProducto);
router.delete("/delete/:id", eliminarProducto);
router.post("/update/:id", actualizarProducto);

module.exports = router;
