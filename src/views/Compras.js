const express = require("express");
const router = express.Router();
const {
  listCompras,
  createCompras,
  updateCompras,
  downCompras,
} = require("../controllers/ComprasController");

router.get("/", listCompras);
router.post("/create", createCompras);
router.post("/update/:id", updateCompras);
router.post("/bajaCompra/:id", downCompras);
module.exports = router;
