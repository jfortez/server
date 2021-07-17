const express = require("express");
const router = express.Router();
const {
  // getUsuario,
  crearUsuario,
  eliminarUsuario,
  getUsuarioById,
  actualizarUsuario,
} = require("../controllers/UsuarioController");
const { authorize, authorized, signin } = require("../auth/auth");

// router.get("/", getUsuario);
router.get("/", authorized);
router.post("/signin", signin);
router.get("/verifyToken", authorize);
router.get("/user/:id", getUsuarioById);
router.post("/create", crearUsuario);
router.delete("/delete/:id", eliminarUsuario);
router.post("/update/:id", actualizarUsuario);

module.exports = router;
