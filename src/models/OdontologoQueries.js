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
