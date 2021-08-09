exports.getOdontologos = () => {
  return "SELECT * FROM odontologos o, personas pc WHERE o.id = pc.id_Odontologo";
};
exports.getOdontologosById = () => {
  return "SELECT * FROM odontologos WHERE id=?";
};
exports.ifOdontologoExists = () => {
  return "SELECT * FROM odontologos WHERE cedula=?";
};
exports.insertOdontologos = () => {
  return "INSERT INTO odontologos SET ?";
};
exports.deleteOdontologos = () => {
  return "DELETE FROM odontologos WHERE id=?";
};
exports.updateOdontologos = () => {
  return "UPDATE odontologos SET ? WHERE id=?";
};
exports.verificarEnTablaPersonas = () => {
  return "SELECT * FROM personas WHERE cedula=?";
};
exports.almacenarDatos = () => {
  return "INSERT INTO personas SET ?";
};
exports.verificarById = () => {
  return "SELECT * FROM odontologos o, personas pc WHERE o.id = pc.id_Odontologo AND o.id=?";
};
exports.newUpdate = () => {
  return "UPDATE odontologos o , personas pc SET  ? WHERE o.id = pc.id_Odontologo AND o.id=?";
};
exports.deletePersona = () => {
  return "DELETE FROM personas WHERE id_Odontologo=?";
};
exports.verifyIfUserAlreadyExists = () => {
  return "SELECT * FROM usuarios u, personas p, odontologos o WHERE p.id_Personal=o.id AND o.id_Usuario=u.id AND p.cedula=?";
};
exports.newUpdateIdUsuario = () => {
  return "UPDATE odontologos p , personas pc SET  id_Usuario=?  WHERE p.id = pc.id_Odontologo AND pc.cedula=?";
};
exports.getOdontologoByCed = () => {
  return "SELECT * FROM personas p, odontologos o WHERE p.id_Odontologo=o.id AND p.cedula=?";
};
