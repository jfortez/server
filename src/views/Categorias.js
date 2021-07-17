const express = require("express");
const router = express.Router();
const {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  getCategoriaById,
  listCategoria,
} = require("../controllers/CategoriaController");

router.get("/", listCategoria);
router.get("/:id", getCategoriaById);
router.post("/create", crearCategoria);
router.delete("/delete/:id", eliminarCategoria);
router.post("/update/:id", actualizarCategoria);
module.exports = router;
