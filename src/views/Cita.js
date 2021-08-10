const express = require("express");
const router = express.Router();
const { createCita, listCita, updateCita } = require("../controllers/CitaController");

router.get("/", listCita);
router.post("/create", createCita);
router.post("/update/:id", updateCita);
module.exports = router;
