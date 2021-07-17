exports.getUsuarios = () => {
  return "SELECT * from usuarios";
};
exports.getUsuariosById = () => {
  return `SELECT * FROM usuarios WHERE id=?`;
};
exports.loginUser = () => {
  return `SELECT * from usuarios WHERE usuario=? and contraseña=?`;
};
exports.viewUsername = () => {
  return "SELECT * from usuarios where usuario=?";
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
