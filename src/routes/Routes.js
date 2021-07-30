const express = require("express");
const routes = express();

routes.use("/usuarios", require("../views/Usuarios"));
routes.use("/personal", require("../views/Personal"));
routes.use("/pacientes", require("../views/Pacientes"));
routes.use("/clientes", require("../views/Clientes"));
routes.use("/productos", require("../views/Productos"));
routes.use("/ventas", require("../views/Venta"));
routes.use("/categorias", require("../views/Categorias"));
routes.use("/odontologos", require("../views/Odontologos"));
routes.use("/cargo", require("../views/Cargo"));

module.exports = routes;
