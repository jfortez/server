exports.getCaja = () => {
  return "SELECT * from caja";
};
exports.getCajaByLastId = () => {
  return "SELECT MAX(c.id) AS last_id, c.* from caja c";
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
