exports.getAgenda = () => {
  return "SELECT * from agenda";
};
exports.getAgendawDetalles = () => {
  return "SELECT a.*, p.cedula AS cedula_paciente,  p.nombres AS nombres_paciente, p.apellidos AS apellidos_paciente, s.cod_servicio, s.nombre AS nombre_servicio, s.descripcion AS descripcion_servicio, s.precio AS precio_servicio, ps.cedula AS cedula_odontologo, ps.nombres AS nombres_odontologo, ps.apellidos AS apellidos_odontologo from agenda a, pacientes p, servicios s, odontologos o, personas ps WHERE a.id_Paciente=p.id AND a.id_Servicio=s.id AND a.id_Odontologo=o.id AND o.id=ps.id_Odontologo";
};
exports.getAgendawDetallesByOdontologo = () => {
  return "SELECT a.*, p.cedula AS cedula_paciente,  p.nombres AS nombres_paciente, p.apellidos AS apellidos_paciente, s.cod_servicio, s.nombre AS nombre_servicio, s.descripcion AS descripcion_servicio, s.precio AS precio_servicio, ps.cedula AS cedula_odontologo, ps.nombres AS nombres_odontologo, ps.apellidos AS apellidos_odontologo from agenda a, pacientes p, servicios s, odontologos o, personas ps WHERE a.id_Paciente=p.id AND a.id_Servicio=s.id AND a.id_Odontologo=o.id AND o.id=ps.id_Odontologo AND o.id=?";
};
exports.getAgendawDetallesById = () => {
  return "SELECT a.*, p.cedula AS cedula_paciente,  p.nombres AS nombres_paciente, p.apellidos AS apellidos_paciente, s.cod_servicio, s.nombre AS nombre_servicio, s.descripcion AS descripcion_servicio, s.precio AS precio_servicio, ps.cedula AS cedula_odontologo, ps.nombres AS nombres_odontologo, ps.apellidos AS apellidos_odontologo from agenda a, pacientes p, servicios s, odontologos o, personas ps WHERE a.id_Paciente=p.id AND a.id_Servicio=s.id AND a.id_Odontologo=o.id AND o.id=ps.id_Odontologo and a.id=?";
};
exports.getColaAgenda = () => {
  return "SELECT * FROM agenda a, cola_agenda cg WHERE a.id=cg.id_agenda AND cg.estado='PENDIENTE' and  a.id_Odontologo=?";
};
exports.insertAgenda = () => {
  return "INSERT INTO agenda SET ?";
};
exports.updateAgenda = () => {
  return "UPDATE agenda SET ? WHERE id=?";
};
exports.deleteAgenda = () => {
  return "DELETE FROM agenda WHERE id=?";
};
exports.modificarEstadoAgenda = () => {
  return "UPDATE agenda a, cola_agenda cg SET cg.estado=?, a.estado=? WHERE a.id=cg.id_agenda AND a.id=?";
};
