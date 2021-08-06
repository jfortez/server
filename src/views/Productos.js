const express = require("express");
const router = express.Router();
const {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  getProductoById,
  listProducto,
  getProductoByCod,
} = require("../controllers/ProductoController");

router.get("/", listProducto);
router.get("/:id", getProductoById);
router.post("/cod", getProductoByCod);
router.post("/create", crearProducto);
router.delete("/delete/:id", eliminarProducto);
router.post("/update/:id", actualizarProducto);

module.exports = router;
