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
routes.use("/proveedores", require("../views/Proveedores"));
routes.use("/compras", require("../views/Compras"));
routes.use("/comprasdetalle", require("../views/DetalleCompras"));
routes.use("/caja", require("../views/Caja"));
routes.use("/cajamovimientos", require("../views/MovimientoCaja"));
routes.use("/agenda", require("../views/Agenda"));
routes.use("/cita", require("../views/Cita"));
routes.use("/receta", require("../views/Receta"));
routes.use("/servicios", require("../views/Servicios"));
routes.use("/ventaservicios", require("../views/Venta_Servicio"));
routes.use("/facturacionservicios", require("../views/Facturacion_Servicio"));

module.exports = routes;
