const express = require("express");
const router = express.Router();
const {
  createAgenda,
  deleteAgenda,
  listAgenda,
  updateAgenda,
  estadoAgenda,
  listAgendaByID,
  listAgendaByOdontologo,
} = require("../controllers/AgendaController");

router.get("/", listAgenda);
router.get("/odontologo/:id", listAgendaByOdontologo);
router.get("/:id", listAgendaByID);
router.post("/create", createAgenda);
router.post("/estadoagenda/:id", estadoAgenda);
router.post("/update/:id", updateAgenda);
router.delete("/delete/:id", deleteAgenda);
module.exports = router;
