exports.getCaja = () => {
  return "SELECT * from caja";
};
exports.createCaja = () => {
  return "INSERT INTO caja SET ?";
};
exports.updateCaja = () => {
  return "UPDATE caja SET ? WHERE id=?";
};
