exports.getPersonal = () => {
  return "select * from personal";
};
exports.getPersonalById = () => {
  return "SELECT * FROM personal WHERE id=?";
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
