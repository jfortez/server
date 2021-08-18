const express = require("express");
const router = express.Router();
const {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  bajaCategoria,
  getCategoriaById,
  listCategoria,
} = require("../controllers/CategoriaController");

router.get("/", listCategoria);
router.get("/:id", getCategoriaById);
router.post("/create", crearCategoria);
router.post("/baja/:id", bajaCategoria);
router.delete("/delete/:id", eliminarCategoria);
router.post("/update/:id", actualizarCategoria);
module.exports = router;
