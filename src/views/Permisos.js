const express = require("express");
const router = express.Router();
const { getPermisos, createPermisos } = require("../controllers/PermisoController");

router.get("/", getPermisos);
router.post("/create", createPermisos);
module.exports = router;
