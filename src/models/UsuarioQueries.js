exports.getUsuarios = () => {
  return "SELECT * from usuarios";
};
exports.getUsuariosById = () => {
  return `SELECT * FROM usuarios WHERE id=?`;
};
exports.loginUser = () => {
  return `SELECT * from usuarios WHERE usuario=? and contraseña=?`;
};
exports.loginUserPersonal = () => {
  return "SELECT * FROM usuarios u, personas p, personal pc WHERE pc.id=p.id_Personal AND u.id=pc.id_Usuario AND u.usuario=? and u.contraseña=?";
};
exports.loginUserOdontologo = () => {
  return "SELECT * FROM usuarios u, personas p, odontologos pc WHERE pc.id=p.id_Odontologo AND u.id=pc.id_Usuario AND u.usuario=? and u.contraseña=?";
};
exports.viewUsername = () => {
  return "SELECT * from usuarios where usuario=?";
};
exports.viewUsernameByPersonal = () => {
  return "SELECT * FROM usuarios u, personas p, personal pc WHERE pc.id=p.id_Personal AND u.id=pc.id_Usuario AND u.usuario=?";
};
exports.viewUsernameByOdontologo = () => {
  return "SELECT * FROM usuarios u, personas p, odontologos pc WHERE pc.id=p.id_Odontologo AND u.id=pc.id_Usuario AND u.usuario=?";
};
exports.ifUserExists = () => {
  return `SELECT * FROM usuarios WHERE usuario=?`;
};
exports.inserUsuario = () => {
  return `INSERT INTO usuarios SET ?`;
};
exports.deleteUsuario = () => {
  return `DELETE FROM usuarios WHERE id=?`;
};
exports.updateUsuario = () => {
  return `UPDATE  usuarios SET ? WHERE id=?`;
};
exports.setOdontologoUserToNull = () => {
  return "UPDATE  usuarios u, odontologos o SET id_Usuario=NULL WHERE u.id=o.id_Usuario AND u.id=?";
};
exports.setPersonalUserToNull = () => {
  return "UPDATE  usuarios u, personal p SET id_Usuario=NULL WHERE u.id=p.id_Usuario AND u.id=?";
};
exports.getPerUsersInUse = () => {
  return "SELECT * FROM usuarios u, personas p, personal pc WHERE (p.id_Personal= pc.id AND u.id=pc.id_Usuario)";
};
exports.getOdUsersInUse = () => {
  return "SELECT * FROM usuarios u, personas p,  odontologos o WHERE  (p.id_Odontologo=o.id AND u.id=o.id_Usuario)";
};
