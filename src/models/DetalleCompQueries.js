exports.getDetalleCompras = () => {
  return "SELECT * from detalle_compra";
};
exports.insertDetalleCompras = () => {
  return "INSERT INTO detalle_compra (id_compra, id_producto, cantidad, precio, total) VALUES ?";
};
