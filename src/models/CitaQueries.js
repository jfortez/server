exports.getCita = () => {
  return "SELECT * FROM cita";
};
exports.getCitaByIdAgenda = () => {
  return "SELECT * FROM cita WHERE id_agenda=?";
};
exports.insertCita = () => {
  return "INSERT INTO cita SET ?";
};
exports.updateCita = () => {
  return "UPDATE cita SET ? WHERE id_agenda=?";
};
exports.maxid = () => {
  return "SELECT MAX(id) FROM cita";
};
