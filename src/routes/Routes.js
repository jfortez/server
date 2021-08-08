const express = require("express");
const routes = express();

routes.use("/usuarios", require("../views/Usuarios"));
routes.use("/personal", require("../views/Personal"));
routes.use("/pacientes", require("../views/Pacientes"));
routes.use("/clientes", require("../views/Clientes"));
routes.use("/productos", require("../views/Productos"));
routes.use("/ventas", require("../views/Venta"));
routes.use("/ventasdetalle", require("../views/DetalleVenta"));
routes.use("/categorias", require("../views/Categorias"));
routes.use("/odontologos", require("../views/Odontologos"));
routes.use("/cargo", require("../views/Cargo"));
routes.use("/empresa", require("../views/Empresa"));
routes.use("/personas", require("../views/Personas"));
routes.use("/configuraciones", require("../views/Configuraciones"));

module.exports = routes;
