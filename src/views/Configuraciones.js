const express = require("express");
const router = express.Router();
const { getNumValues, updateValues } = require("../controllers/ConfigControlller");

router.get("/numValues", getNumValues);
router.post("/updateValues", updateValues);
module.exports = router;
