const express = require("express");
const router = express.Router();
const {
  getPersonal,
  createPersonal,
} = require("../controllers/PersonalController");

router.get("/", getPersonal);
router.post("/create", createPersonal);

module.exports = router;
