exports.getPersonal = () => {
  return "SELECT * FROM personal";
};
exports.insertPersonal = () => {
  return "INSERT INTO personal SET ?";
};
