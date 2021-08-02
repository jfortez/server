exports.getOdontologos = () => {
  return "select * from odontologos";
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
