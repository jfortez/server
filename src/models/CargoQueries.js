exports.getCargo = () => {
  return "select * from cargo";
};
exports.getCargoById = () => {
  return "SELECT * FROM cargo WHERE id=?";
};
exports.insertCargo = () => {
  return "INSERT INTO cargo SET ?";
};
exports.ifCargoExists = () => {
  return "SELECT * FROM cargo where nombre=?";
};
exports.deleteCargo = () => {
  return "DELETE FROM cargo WHERE id=?";
};
exports.updateCargo = () => {
  return "UPDATE cargo SET ? WHERE id=?";
};
