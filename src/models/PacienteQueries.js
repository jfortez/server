exports.getPacientes = () => {
  return "SELECT * FROM pacientes where active=1";
};
exports.ifPacienteExiste = () => {
  return "SELECT * FROM pacientes WHERE cedula=?";
};
exports.bajaPaciente = () => {
  return "UPDATE pacientes SET active=0 WHERE pacientes.id=?";
};
exports.getPacienteById = () => {
  return "SELECT * FROM pacientes WHERE id=?";
};
exports.insertPacientes = () => {
  return "INSERT INTO pacientes SET ?";
};
exports.deletePacientes = () => {
  return "DELETE FROM pacientes WHERE id=?";
};
exports.updatePacientes = () => {
  return "UPDATE pacientes SET ? WHERE id=?";
};
