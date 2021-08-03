const express = require("express");
const router = express.Router();
const {
  // actualizarOdontologo,
  // crearOdontologo,
  // eliminarOdontologo,
  // getOdontologoById,
  // getOdontologoByCedula,
  getOdontologo,
  updateOdolontogo,
  getOdontologoById,
  createOdontologo,
  deleteOdolontogo,
  setUser,
} = require("../controllers/OdontologosController");

// router.post("/by/cedula", getOdontologoByCedula);
// router.get("/:id", getOdontologoById);
// router.post("/create", crearOdontologo);
// router.delete("/delete/:id", eliminarOdontologo);
// router.post("/update/:id", actualizarOdontologo);
router.get("/", getOdontologo);
router.get("/:id", getOdontologoById);
router.post("/setUser", setUser);
router.post("/create", createOdontologo);
router.post("/update/:id", updateOdolontogo);
router.delete("/delete/:id", deleteOdolontogo);
module.exports = router;
