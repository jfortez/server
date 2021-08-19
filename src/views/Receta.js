const express = require("express");
const router = express.Router();
const {
  bajaReceta,
  creatReceta,
  listReceta,
  updateReceta,
  listRecetaByIdAgenda,
} = require("../controllers/RecetaController");

router.get("/", listReceta);
router.get("/:id", listRecetaByIdAgenda);
router.post("/create", creatReceta);
router.post("/update/:id", updateReceta);
router.post("/baja/:id", bajaReceta);
module.exports = router;
