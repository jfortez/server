const express = require("express");
const router = express.Router();
const {
  getCedulas,
  getOdontolgosByCedula,
  getPersonalByCedula,
} = require("../controllers/PersonasController");

router.get("/ci", getCedulas);
router.post("/ciOdontologo", getOdontolgosByCedula);
router.post("/ciPersonal", getPersonalByCedula);

module.exports = router;
