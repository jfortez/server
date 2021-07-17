exports.getPacientes = () => {
  return "SELECT * FROM pacientes";
};
exports.ifPacienteExiste = () => {
  return "SELECT * FROM pacientes WHERE num_documento=?";
};
exports.getPacienteById = () => {
  return "SELECT * FROM pacientes WHERE id_Paciente=?";
};
exports.insertPacientes = () => {
  return "INSERT INTO pacientes SET ?";
};
exports.deletePacientes = () => {
  return "DELETE FROM pacientes WHERE id_Paciente=?";
};
exports.updatePacientes = () => {
  return "UPDATE pacientes SET ? WHERE id_Paciente=?";
};
