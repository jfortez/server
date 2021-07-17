exports.getVentas = () => {
  return "select * from ventas";
};
exports.getVentasById = () => {
  return "SELECT * FROM ventas WHERE id=?";
};
exports.getVentasByNumVenta = () => {
  return "SELECT * FROM ventas WHERE num_venta=?";
};
exports.insertVentas = () => {
  return "INSERT INTO ventas SET ?";
};
exports.deleteVentas = () => {
  return "DELETE FROM ventas WHERE id=?";
};
exports.updateVentas = () => {
  return "UPDATE ventas SET ? WHERE id=?";
};
