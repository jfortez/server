exports.getColaAgenda = () => {
  return "SELECT * FROM cola_agenda WHERE estado='PENDIENTE' ";
};
exports.insertColaAgenda = () => {
  return "INSERT INTO cola_agenda SET ?";
};
exports.updateColaAgenda = () => {
  return "UPDATE cola_agenda SET ? where id=?";
};
