const express = require("express");
const router = express.Router();
const {
  bajaServicios,
  createServicio,
  listServicios,
  updateServicios,
  listServiciosById,
  listServiciosByCod,
} = require("../controllers/ServiciosController");

router.get("/", listServicios);
router.get("/:id", listServiciosById);
router.post("/codigo", listServiciosByCod);
router.post("/create", createServicio);
router.post("/update/:id", updateServicios);
router.post("/baja/:id", bajaServicios);
module.exports = router;
