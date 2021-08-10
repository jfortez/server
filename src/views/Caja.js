const express = require("express");
const router = express.Router();
const { createCaja, listCaja, updateCaja } = require("../controllers/CajaController");

router.get("/", listCaja);
router.post("/create", createCaja);
router.post("/update/:id", updateCaja);
module.exports = router;
