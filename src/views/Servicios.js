const express = require("express");
const router = express.Router();
const {
  bajaServicios,
  createServicio,
  listServicios,
  updateServicios,
} = require("../controllers/ServiciosController");

router.get("/", listServicios);
router.post("/create", createServicio);
router.post("/update/:id", updateServicios);
router.post("/baja/:id", bajaServicios);
module.exports = router;
