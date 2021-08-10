exports.getMovimientosCaja = () => {
  return "SELECT * from movimientos_caja";
};
exports.createMovimientosCaja = () => {
  return "INSERT INTO movimientos_caja SET ?";
};
exports.updateMovimientoCaja = () => {
  return "UPDATE movimientos_caja SET ? WHERE id=?";
};
