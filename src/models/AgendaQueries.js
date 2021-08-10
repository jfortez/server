exports.getAgenda = () => {
  return "SELECT * from agenda";
};
exports.insertAgenda = () => {
  return "INSERT INTO agenda SET ?";
};
exports.updateAgenda = () => {
  return "UPDATE aged SET ? WHERE id=?";
};
exports.deleteAgenda = () => {
  return "DELETE FROM agenda WHERE id=?";
};
