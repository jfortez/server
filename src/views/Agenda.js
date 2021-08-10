const express = require("express");
const router = express.Router();
const {
  createAgenda,
  deleteAgenda,
  listAgenda,
  updateAgenda,
} = require("../controllers/AgendaController");

router.get("/", listAgenda);
router.post("/create", createAgenda);
router.post("/update/:id", updateAgenda);
router.delete("/delete/:id", deleteAgenda);
module.exports = router;
