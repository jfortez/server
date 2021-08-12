exports.getServicios = () => {
  return "SELECT * from servicios WHERE active=1";
};
exports.getServiciosByCod = () => {
  return "SELECT * from servicios WHERE cod_servicio=?";
};
exports.getServiciosByCodAndActive = () => {
  return "SELECT * from servicios WHERE active=1 AND cod_servicio=?";
};
exports.getServiciosById = () => {
  return "SELECT * from servicios WHERE active=1 and id=?";
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
