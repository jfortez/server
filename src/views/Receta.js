const express = require("express");
const router = express.Router();
const {
  bajaReceta,
  creatReceta,
  listReceta,
  updateReceta,
} = require("../controllers/RecetaController");

router.get("/", listReceta);
router.post("/create", creatReceta);
router.post("/update/:id", updateReceta);
router.post("/baja/:id", bajaReceta);
module.exports = router;
