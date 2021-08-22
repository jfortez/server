exports.getCaja = () => {
  return "SELECT caja.id AS id_caja, caja.fecha, caja.caja_inicio, caja.caja_actual, caja.caja_cierre, caja.estado_caja, caja.fecha_cierre, usuarios.usuario FROM caja, usuarios WHERE caja.id_Usuario=usuarios.id";
};
exports.getCajaByLastId = () => {
  return "SELECT * FROM caja ORDER BY id DESC LIMIT 1";
};
exports.createCaja = () => {
  return "INSERT INTO caja SET ?";
};
exports.updateCaja = () => {
  return "UPDATE caja SET ? WHERE id=?";
};
exports.cerrarCajaActual = () => {
  // return "UPDATE caja SET ? where id=?";
  return "UPDATE caja SET ? ORDER BY id DESC LIMIT 1";
};
