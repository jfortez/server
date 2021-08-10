exports.getDetalleVenta = () => {
  return "select * from facturacion_servicio";
};
exports.insertDetalleVenta = () => {
  return "INSERT INTO facturacion_servicio (id_venta_servicios, id_Servicio, precio, total) VALUES ?";
};
