exports.getDetalleVenta = () => {
  return "select * from detalle_venta";
};
exports.insertDetalleVenta = () => {
  return "INSERT INTO detalle_venta (id_Venta,id_Producto,precio,cantidad,total) VALUES ?";
};
