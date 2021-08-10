exports.getVentaServicios = () => {
  return "SELECT * from venta_servicios";
};
exports.insertVentaServicios = () => {
  return "INSERT into venta_servicios SET ?";
};
exports.updateVentaServicios = () => {
  return "UPDATE venta_servicios SET ? WHERE id=?";
};
exports.deleteVentaServicios = () => {
  return "DELETE FROM venta_servicios WHERE id=?";
};
