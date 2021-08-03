exports.insertPersonal = () => {
  return "INSERT INTO personal SET ?";
};
exports.deletePersonal = () => {
  return "DELETE FROM personal WHERE id=?";
};
exports.verifyIfUserAlreadyExists = () => {
  return "SELECT * FROM usuarios u, personas p, personal pc WHERE p.id_Personal=pc.id AND pc.id_Usuario=u.id AND p.cedula=?";
};
exports.verificarEnTablaPersonas = () => {
  return "SELECT * FROM personas WHERE cedula=?";
};
exports.listPersonal = () => {
  return "SELECT * FROM personal p, personas pc WHERE p.id = pc.id_Personal";
};
exports.almacenarDatos = () => {
  return "INSERT INTO personas SET ?";
};
exports.verificarById = () => {
  return "SELECT * FROM personal p, personas pc WHERE p.id = pc.id_Personal AND p.id=?";
};
exports.newUpdate = () => {
  return "UPDATE personal p , personas pc SET  ? WHERE p.id = pc.id_Personal AND p.id=?";
};
exports.newUpdateIdUsuario = () => {
  return "UPDATE personal p , personas pc SET  id_Usuario=?  WHERE p.id = pc.id_Personal AND pc.cedula=?";
};
exports.deletePersona = () => {
  return "DELETE FROM personas WHERE id_Personal=?";
};
