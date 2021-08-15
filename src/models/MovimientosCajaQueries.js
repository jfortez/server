exports.getMovimientosCaja = () => {
  return "SELECT c.id AS id_caja, c.fecha, c.caja_inicio, c.cierre_caja, c.fecha_cierre, c.id_Usuario, u.usuario, cj.ingreso, cj.egreso, cj.descripcion, cj.fechaMovimiento, cj.caja_actual FROM caja c, movimientos_caja cj, usuarios u WHERE c.id=cj.id_caja AND u.id=c.id_Usuario AND u.id=cj.id_Usuario";
};
exports.createMovimientosCaja = () => {
  return "INSERT INTO movimientos_caja SET ?";
};
exports.updateMovimientoCaja = () => {
  return "UPDATE movimientos_caja SET ? WHERE id=?";
};
