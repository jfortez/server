const express = require("express");
const router = express.Router();
const {
  getUsuario,
  crearUsuario,
  eliminarOdUsuario,
  getUsuarioById,
  actualizarUsuario,
  eliminarPerUsuario,
  getPersInUse,
  getOdInUse,
  bajaUsuarios,
  activarUsuario,
  getUsusuarioById,
  getAllUsersInUse,
} = require("../controllers/UsuarioController");
const { authorize, authorized, signin } = require("../auth/auth");

// router.get("/", authorized);
router.get("/", getUsuario);
router.get("/:id", getUsusuarioById);
router.get("/pers", getPersInUse);
router.get("/all", getAllUsersInUse);
router.get("/od", getOdInUse);
router.post("/signin", signin);
router.get("/verifyToken", authorize);
router.get("/user/:id", getUsuarioById);
router.post("/create", crearUsuario);
router.post("/baja/:id", bajaUsuarios);
router.post("/activar/:id", activarUsuario);
router.delete("/deleteO/:id", eliminarOdUsuario);
router.delete("/deleteP/:id", eliminarPerUsuario);
router.post("/update/:id", actualizarUsuario);

module.exports = router;
