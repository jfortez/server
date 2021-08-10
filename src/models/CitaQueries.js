exports.getCita = () => {
  return "SELECT * FROM cita";
};
exports.insertCita = () => {
  return "INSERT INTO cita SET ?";
};
exports.updateCita = () => {
  return "UPDATE cita SET ? WHERE id=?";
};
