exports.getPersonal = () => {
  return "select * from personal";
};
exports.getPersonalById = () => {
  return "SELECT * FROM personal WHERE id=?";
};
exports.getPersonalCedula = () => {
  return "SELECT cedula FROM personal";
};
exports.insertPersonal = () => {
  return "INSERT INTO personal SET ?";
};
exports.ifPersonalExists = () => {
  return "SELECT * FROM personal where cedula=?";
};
exports.deletePersonal = () => {
  return "DELETE FROM personal WHERE id=?";
};
exports.updatePersonal = () => {
  return "UPDATE personal SET ? WHERE id=?";
};
exports.updateIdUsuario = () => {
  return "UPDATE personal SET id_Usuario=? WHERE cedula=?";
};
exports.verifyIfUserAlreadyExists = () => {
  return "SELECT u.usuario, u.previlegios, u.active, p.nombres, p.apellidos, p.cedula FROM usuarios u, personal p WHERE u.id=p.id_Usuario AND p.cedula= ?";
};
