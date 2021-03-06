const express = require("express");
const router = express.Router();
const {
  getPersonal,
  getPersonalById,
  pruebaCrear,
  pruebaActualizar,
  pruebaEliminar,
  bajaPersonal,
  setUser,
} = require("../controllers/PersonalController");

router.get("/", getPersonal);
router.get("/:id", getPersonalById);
router.post("/setUser", setUser);
router.post("/create", pruebaCrear);
router.post("/baja/:id", bajaPersonal);
router.post("/update/:id", pruebaActualizar);
router.delete("/delete/:id", pruebaEliminar);

module.exports = router;
