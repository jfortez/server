exports.getServicios = () => {
  return "SELECT * from servicios";
};
exports.insertServicios = () => {
  return "INSERT INTO servicios SET ?";
};
exports.updateServicios = () => {
  return "UPDATE servicios SET ? WHERE id=?";
};
exports.downServicios = () => {
  return "UPDATE servicios SET active=0 WHERE id=?";
};
