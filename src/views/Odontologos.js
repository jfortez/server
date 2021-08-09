const express = require("express");
const router = express.Router();
const {
  getOdontologo,
  updateOdolontogo,
  getOdontologoById,
  createOdontologo,
  deleteOdolontogo,
  setUser,
  getOdontologoByCedula,
} = require("../controllers/OdontologosController");

router.get("/", getOdontologo);
router.post("/cedula", getOdontologoByCedula);
router.get("/:id", getOdontologoById);
router.post("/setUser", setUser);
router.post("/create", createOdontologo);
router.post("/update/:id", updateOdolontogo);
router.delete("/delete/:id", deleteOdolontogo);
module.exports = router;
