const express = require("express");
const router = express.Router();
const { createCola_Agenda, listCola_Agenda } = require("../controllers/ColaAgendaController");

router.get("/", listCola_Agenda);
router.post("/create", createCola_Agenda);
// router.post("/update/:id", );

module.exports = router;
