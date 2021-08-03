exports.getCiPersonas = () => {
  return "SELECT * FROM personas";
};
exports.getPersonalRowByCedula = () => {
  return "SELECT * FROM personas p, personal pc WHERE p.id_Personal=pc.id AND p.cedula=?";
};
exports.getOdontologoRowByCedula = () => {
  return "SELECT * FROM personas p, odontologos pc WHERE p.id_Odontologo=pc.id AND p.cedula=?";
};
