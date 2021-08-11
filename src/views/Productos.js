const express = require("express");
const router = express.Router();
const {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  getProductoById,
  listProducto,
  getProductoByCod,
  test,
  updateByCompras,
  multipleCreate,
} = require("../controllers/ProductoController");

router.get("/", listProducto);
router.get("/:id", getProductoById);
router.post("/test", test);
router.post("/actualizarByCompras", updateByCompras);
router.post("/cod", getProductoByCod);
router.post("/create", crearProducto);
router.post("/createmultiple", multipleCreate);
router.delete("/delete/:id", eliminarProducto);
router.post("/update/:id", actualizarProducto);

module.exports = router;
