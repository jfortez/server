const express = require("express");
const router = express.Router();
const {
  createCita,
  listCita,
  updateCita,
  listCitaById,
  maxid,
} = require("../controllers/CitaController");

router.get("/", listCita);
router.get("/:id", listCitaById);
router.get("/maxid", maxid);
router.post("/create", createCita);
router.post("/update/:id", updateCita);
module.exports = router;
