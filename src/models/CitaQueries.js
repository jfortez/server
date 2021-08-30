exports.getCita = () => {
  return "SELECT * FROM cita";
};
exports.getCitaByIdAgenda = () => {
  return "SELECT cita.*, agenda.*, pacientes.nombres AS nombre_paciente, pacientes.apellidos AS apellido_paciente, pacientes.cedula AS cedula_paciente, pacientes.telefono AS telefono_paciente, pacientes.direccion AS direccion_paciente, personas.nombres AS nombre_odontologo, personas.apellidos as apellido_odontologo, personas.cedula AS cedula_odontologo, personas.telefono AS telefono_odontologo, personas.direccion AS direccion_odontologo, personas.email AS email_odontologo, servicios.*  FROM cita, agenda, pacientes, personas, servicios WHERE cita.id_agenda=agenda.id AND agenda.id_Paciente=pacientes.id AND agenda.id_Odontologo=personas.id_Odontologo AND agenda.id_Servicio=servicios.id AND cita.id_agenda=?";
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
